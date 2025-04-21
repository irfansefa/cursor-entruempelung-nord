<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();

// Load configuration
require_once __DIR__ . '/config.php';

// Load PHPMailer classes
require_once __DIR__ . '/lib/PHPMailer/Exception.php';
require_once __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$site_owner_email = 'info@entrumpelungnord.de';

// Honeypot check
if (!empty($_POST['website'])) {
    http_response_code(400);
    exit;
}

// POST-Daten absichern
$name = htmlspecialchars(trim($_POST['name'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
$subject = htmlspecialchars(trim($_POST['subject'] ?? ''));
$address = htmlspecialchars(trim($_POST['address'] ?? ''));
$date = htmlspecialchars(trim($_POST['date'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));
$timestamp = intval($_POST['timestamp'] ?? 0);
$captcha = trim($_POST['captcha'] ?? '');
$privacy = isset($_POST['privacy']) && $_POST['privacy'] === 'on';

// Validierung
if (!$name || !$email || !$phone || !$subject || !$address || !$message || !$captcha || !$privacy) {
    http_response_code(400);
    echo json_encode(['error' => 'Bitte füllen Sie alle Pflichtfelder aus.']);
    exit;
}

if ($captcha != $_SESSION['captcha_answer']) {
    http_response_code(400);
    echo json_encode(['error' => 'Die Sicherheitsfrage wurde nicht korrekt beantwortet.']);
    exit;
}

// HTML-E-Mail-Template
function createEmailBody($data, $isForSender = false) {
    $header = $isForSender ? 
        "Vielen Dank für Ihre Anfrage bei Entrümpelung-Nord!" : 
        "Neue Anfrage über das Kontaktformular";
    
    $dateFormatted = $data['date'] ? date('d.m.Y', strtotime($data['date'])) : 'Nicht angegeben';
    
    // HTML Version
    $html = "
    <html>
    <body style='font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9;'>
        <h2 style='color: #2b2b2b;'>$header</h2>
        <div style='background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
            <p><strong>Name:</strong> {$data['name']}</p>
            <p><strong>E-Mail:</strong> {$data['email']}</p>
            <p><strong>Telefon:</strong> {$data['phone']}</p>
            <p><strong>Betreff:</strong> {$data['subject']}</p>
            <p><strong>Adresse der Entrümpelung:</strong> {$data['address']}</p>
            <p><strong>Gewünschter Termin:</strong> {$dateFormatted}</p>
            <p><strong>Nachricht:</strong><br>" . nl2br($data['message']) . "</p>
        </div>
        <p style='font-size: 0.9em; color: gray; margin-top: 20px;'>
            Diese E-Mail wurde automatisch erstellt am " . date('d.m.Y H:i', time()) . "
        </p>
    </body>
    </html>";

    // Plain Text Version
    $text = "$header\n\n";
    $text .= "Name: {$data['name']}\n";
    $text .= "E-Mail: {$data['email']}\n";
    $text .= "Telefon: {$data['phone']}\n";
    $text .= "Betreff: {$data['subject']}\n";
    $text .= "Adresse der Entrümpelung: {$data['address']}\n";
    $text .= "Gewünschter Termin: {$dateFormatted}\n\n";
    $text .= "Nachricht:\n{$data['message']}\n\n";
    $text .= "Diese E-Mail wurde automatisch erstellt am " . date('d.m.Y H:i', time());

    return ['html' => $html, 'text' => $text];
}

$formData = [
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'subject' => $subject,
    'address' => $address,
    'date' => $date,
    'message' => $message
];

// Configure PHPMailer
function sendEmail($to, $subject, $body, $replyTo = '') {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;
        $mail->CharSet = 'UTF-8';

        // Recipients
        $mail->setFrom(SMTP_USER, 'Entrümpelung-Nord');
        $mail->addAddress($to);
        if ($replyTo) {
            $mail->addReplyTo($replyTo);
        }

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body['html'];
        $mail->AltBody = $body['text'];

        return $mail->send();
    } catch (Exception $e) {
        error_log("Mailer Error: " . $mail->ErrorInfo);
        return false;
    }
}

// Send emails
$subject_owner = "📥 Neue Entrümpelungsanfrage von $name";
$subject_user = "Ihre Anfrage bei Entrümpelung-Nord";

// Create email bodies
$emailBody = createEmailBody($formData);
$emailBodyUser = createEmailBody($formData, true);

// An Seitenbetreiber
$sent_owner = sendEmail($site_owner_email, $subject_owner, $emailBody, $email);

// An Absender
$sent_user = sendEmail($email, $subject_user, $emailBodyUser);

if ($sent_owner && $sent_user) {
    echo json_encode(['success' => true, 'message' => 'Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich!']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Es gab einen Fehler beim Versenden der Nachricht. Bitte versuchen Sie es später erneut.']);
}
?>

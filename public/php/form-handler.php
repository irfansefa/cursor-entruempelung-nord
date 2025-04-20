<?php
session_start();

$site_owner_email = 'info@moonstar-it.de';

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
    return $html;
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

// E-Mail versenden
$subject_owner = "📥 Neue Entrümpelungsanfrage von $name";
$subject_user = "Ihre Anfrage bei Entrümpelung-Nord";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Entrümpelung-Nord <kontakt@entruempelung-nord.de>\r\n";
$headers .= "Reply-To: $email\r\n";

// An Seitenbetreiber
$sent_owner = mail($site_owner_email, $subject_owner, createEmailBody($formData), $headers);

// An Absender
$sent_user = mail($email, $subject_user, createEmailBody($formData, true), $headers);

if ($sent_owner && $sent_user) {
    echo json_encode(['success' => true, 'message' => 'Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich!']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Es gab einen Fehler beim Versenden der Nachricht. Bitte versuchen Sie es später erneut.']);
}
?>

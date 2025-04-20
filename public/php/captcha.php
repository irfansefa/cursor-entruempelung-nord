<?php
session_start();

// Zufällige Zahlen zwischen 1 und 10
$a = rand(1, 10);
$b = rand(1, 10);

// Rechenoperation (hier nur Addition)
$_SESSION['captcha_answer'] = $a + $b;

// Ausgabe der Aufgabe für das Formular (als reiner Text)
header('Content-Type: text/plain; charset=utf-8');
echo "Was ist $a + $b?";
?>

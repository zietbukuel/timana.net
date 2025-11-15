<?php

// Configuration: replace this with your own email address
$siteOwnersEmail = 'juan@timana.net';

// Small security hardening for responses
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	header('Allow: POST');
	echo 'Method Not Allowed';
	exit;
}

// Gather inputs safely
$name            = trim((string)($_POST['contactName'] ?? ''));
$email           = trim((string)($_POST['contactEmail'] ?? ''));
$contact_message = trim((string)($_POST['contactMessage'] ?? ''));
$subject         = trim((string)($_POST['subject'] ?? 'New Contact form Submission'));

$errors = [];

// Validate Name
if (strlen($name) < 2) {
	$errors['name'] = 'Please enter your name.';
}

// Validate Email (modern, RFC-aware check)
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$errors['email'] = 'Please enter a valid email address.';
}

// Validate Message length
if (strlen($contact_message) < 15) {
	$errors['message'] = 'Your message should have at least 15 characters.';
}

// Subject fallback
if ($subject === '') {
	$subject = 'Contact Form Submission';
}

if ($errors) {
	// Maintain original response format: lines separated by <br />\n
	$parts = [];
	if (isset($errors['name']))    { $parts[] = $errors['name']; }
	if (isset($errors['email']))   { $parts[] = $errors['email']; }
	if (isset($errors['message'])) { $parts[] = $errors['message']; }
	echo implode("<br /> \n", $parts);
	exit;
}

// Protect against header injection in From/Reply-To
$safeName  = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);

// Build a UTF-8 plain text email body
$body  = "Email from: {$name}\n";
$body .= "Email address: {$email}\n";
$body .= "Message:\n{$contact_message}\n";
$body .= "\n-----\nThis email was sent from your site's contact form.\n";

// Email headers (UTF-8)
$headers = [];
$headers[] = "From: {$safeName} <{$safeEmail}>";
$headers[] = "Reply-To: {$safeEmail}";
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'Content-Transfer-Encoding: 8bit';

// Send the email
$sent = @mail($siteOwnersEmail, $subject, $body, implode("\r\n", $headers));

if ($sent) {
	echo 'OK';
} else {
	http_response_code(500);
	echo 'Something went wrong. Please try again.';
}

exit;
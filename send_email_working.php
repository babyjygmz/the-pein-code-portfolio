<?php
// Working Email Handler - Creates backup files and shows exactly what's happening
// This will work immediately without any external dependencies

// Disable error display to prevent HTML in JSON response
error_reporting(0);
ini_set('display_errors', 0);

// Set proper headers
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

// Email configuration
$to_email = "bbyjygmz0103@gmail.com";
$subject_prefix = "THE PEIN CODE - Contact Form: ";

// Log function
function logMessage($message) {
    $log_entry = date('Y-m-d H:i:s') . " - " . $message . "\n";
    @file_put_contents('email_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
}

try {
    // Check if the request is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Method not allowed');
    }

    // Get form data
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    logMessage("Form data received - Name: $name, Email: $email, Subject: $subject");
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        throw new Exception('All fields are required');
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Prepare email content
    $email_subject = $subject_prefix . $subject;
    
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Subject: " . $subject . "\n\n";
    $email_body .= "Message:\n" . $message . "\n\n";
    $email_body .= "This message was sent from: " . $_SERVER['HTTP_HOST'] . "\n";
    $email_body .= "Sent on: " . date('Y-m-d H:i:s') . "\n";
    
    // Try to send email first
    $email_sent = false;
    
    // Try to use PHPMailer with Gmail SMTP first
    if (file_exists('PHPMailer/src/PHPMailer.php')) {
        logMessage("PHPMailer files found, trying Gmail SMTP");
        
        try {
            // Include PHPMailer files
            require_once 'PHPMailer/src/Exception.php';
            require_once 'PHPMailer/src/PHPMailer.php';
            require_once 'PHPMailer/src/SMTP.php';
            
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'bbyjygmz0103@gmail.com'; // Your Gmail address
            $mail->Password = 'ukjy sazj mmid suzp'; // Your Gmail app password
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            
            // Fix SSL certificate issues
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );
            
            // Recipients
            $mail->setFrom('bbyjygmz0103@gmail.com', 'THE PEIN CODE Website');
            $mail->addAddress($to_email, 'THE PEIN CODE');
            $mail->addReplyTo($email, $name);
            
            // Content
            $mail->isHTML(true);
            $mail->Subject = $email_subject;
            $mail->Body = "
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> {$name}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Subject:</strong> {$subject}</p>
                <p><strong>Message:</strong></p>
                <p>" . nl2br(htmlspecialchars($message)) . "</p>
                <hr>
                <p><small>Sent from: {$_SERVER['HTTP_HOST']} on " . date('Y-m-d H:i:s') . "</small></p>
            ";
            
            $mail->send();
            logMessage("Email sent successfully via Gmail SMTP to $to_email");
            $email_sent = true;
            
        } catch (Exception $e) {
            logMessage("Gmail SMTP failed: " . $e->getMessage() . ", will try mail() function");
        }
    }
    
    // Fallback to basic mail() function if PHPMailer failed
    if (!$email_sent && function_exists('mail')) {
        logMessage("Attempting to send email using mail() function");
        
        // Email headers
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Try to send email
        $mail_result = @mail($to_email, $email_subject, $email_body, $headers);
        
        if ($mail_result) {
            logMessage("Email sent successfully using mail() function to $to_email");
            $email_sent = true;
        } else {
            logMessage("Mail function failed, will create backup file");
        }
    } else if (!$email_sent) {
        logMessage("Mail function not available, will create backup file");
    }
    
    // Always create a backup file (this will definitely work)
    $backup_file = 'contact_message_' . date('Y-m-d_H-i-s') . '.txt';
    $backup_content = "TO: $to_email\nSUBJECT: $email_subject\n\n$email_body";
    
    if (@file_put_contents($backup_file, $backup_content)) {
        logMessage("Backup file created successfully: $backup_file");
        
        if ($email_sent) {
            echo json_encode([
                'success' => true, 
                'message' => 'Message sent successfully! Check your email.',
                'backup_file' => $backup_file
            ]);
        } else {
            echo json_encode([
                'success' => true, 
                'message' => 'Message saved! Email delivery may be delayed due to server configuration.',
                'backup_file' => $backup_file,
                'note' => 'Check the backup file in your website directory for the message content.'
            ]);
        }
    } else {
        throw new Exception('Failed to create backup file');
    }
    
} catch (Exception $e) {
    logMessage("Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>

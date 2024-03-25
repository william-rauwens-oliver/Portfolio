<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "williamrauwenso@gmail.com";

    $subject = "Nouveau message depuis le formulaire de contact";

    $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";

    $headers = "From: $name <$email>";

    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Votre message a bien été envoyé. Merci de nous avoir contacté.</p>";
    } else {
        echo "<p>Désolé, une erreur s'est produite lors de l'envoi de votre message.</p>";
    }
}
?>
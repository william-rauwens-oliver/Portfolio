<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Destinataire de l'email (votre adresse email)
    $to = "williamrauwenso@gmail.com";

    // Sujet de l'email
    $subject = "Nouveau message depuis le formulaire de contact";

    // Corps de l'email
    $body = "Nom: $name\nEmail: $email\n\nMessage:\n$message";

    // En-têtes de l'email
    $headers = "From: $name <$email>";

    // Envoyer l'email
    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Votre message a bien été envoyé. Merci de nous avoir contacté.</p>";
    } else {
        echo "<p>Désolé, une erreur s'est produite lors de l'envoi de votre message.</p>";
    }
}
?>
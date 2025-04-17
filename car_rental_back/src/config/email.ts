import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendReservationEmail = async (
  email: string,
  carDetails: {
    brand: string;
    model: string;
    reservedFrom: Date;
    reservedTo: Date;
    customerName: string;
  }
) => {
  const formattedFromDate = new Date(carDetails.reservedFrom).toLocaleDateString();
  const formattedToDate = new Date(carDetails.reservedTo).toLocaleDateString();

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: email,
    subject: 'Confirmation de votre réservation',
    html: `
      <h1>Confirmation de réservation</h1>
      <p>Bonjour ${carDetails.customerName},</p>
      <p>Votre réservation a été confirmée avec succès !</p>
      <h2>Détails de la réservation :</h2>
      <ul>
        <li>Véhicule : ${carDetails.brand} ${carDetails.model}</li>
        <li>Date de début : ${formattedFromDate}</li>
        <li>Date de fin : ${formattedToDate}</li>
      </ul>
      <p>Nous vous remercions de votre confiance.</p>
      <p>L'équipe Unlock Formation</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reservation confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending reservation confirmation email:', error);
    throw new Error('Failed to send reservation confirmation email');
  }
};
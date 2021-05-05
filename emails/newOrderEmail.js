const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = (inserted, email, date, notes, emails) => {
    const msg = {
        from: process.env.SENDGRID_SENDER,
        subject: 'Nuovo ordine',
        text: `Nuovo ordine\n\nInviato in data: ${inserted}\n\nEmail: ${email}\n\nDa completare entro: ${date}\n\nNote:\n\n${notes}`,
        html: `<b>Nuovo ordine</b><br><br><b>Inviato in data: ${inserted}</b><br><br><b>Email: ${email}</b><br><br><b>Da completare entro: ${date}</b><br><br><b>Note:</b><br><br><b>${notes}</b>`,
        personalizations: [
            {
            to: emails
            }
        ]
    }
    sgMail
    .send(msg)
    .catch((error) => {
        console.error(error)
    });
}


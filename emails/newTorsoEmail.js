const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = (inserted, email, name, phone, notes, front, back, emails) => {
    const msg = {
        from: process.env.SENDGRID_SENDER,
        subject: 'Nuovo torso',
        text: `Nuovo ordine torso\n\nInviato in data: ${inserted}\n\nEmail: ${email}\n\nNome: ${name}\n\nTelefono: ${phone}\n\nNote:\n\n${notes}`,
        html: `<b>Nuovo ordine torso</b><br><br><b>Inviato in data: ${inserted}</b><br><br><b>Email: ${email}</b><br><br><b>Nome: ${name}</b><br><br><b>Telefono: ${phone}</b><br><br><b>Note:</b><br><br><b>${notes}</b>`,
        attachments: [
            {
              content: front,
              filename: "front.png",
              type: "image/png",
              disposition: "attachment"
            },
            {
                content: back,
                filename: "back.png",
                type: "image/png",
                disposition: "attachment"
              }
        ],
        personalizations: [
            {
            to: emails
            }
        ]
    }
    sgMail
    .send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
    })
    .catch((error) => {
        console.error(error)
    });
}


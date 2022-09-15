import { default as sgMail } from "@sendgrid/mail";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const newOrderEmail = async (order) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const emails = (await prisma.notificationEmails.findMany()).map(e => e.email);
    if (emails.length < 1) {
        return;
    }
    const msg = {
        from: process.env.SENDGRID_SENDER,
        subject: 'Lego Customizer - New Order',
        text: `New order received\n\nDate: ${order.inserted}\n\nEmail: ${order.email}\n\nName: ${order.name}\n\nPhone: ${order.phone}\n\nNote:\n\n${order.notes}`,
        html: `<b>New order received</b><br><br><b>Date: ${order.inserted}</b><br><br><b>Email: ${order.email}</b><br><br><b>Name: ${order.name}</b><br><br><b>Phone: ${order.phone}</b><br><br><b>Note:</b><br><br><b>${order.notes}</b>`,
        personalizations: [
            {
                to: emails
            }
        ]
    }
    try {
        await sgMail.send(msg);
    } catch(err) {
        console.error(err);
    }
}

export const newTorsoEmail = async (order, front, back) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const emails = (await prisma.notificationEmails.findMany()).map(e => e.email);
    if (emails.length < 1) {
        return;
    }
    const msg = {
        from: process.env.SENDGRID_SENDER,
        subject: 'Lego Customizer - New Torso Order',
        text: `New Torso order received\n\nDate: ${order.inserted}\n\nEmail: ${order.email}\n\nName: ${order.name}\n\nPhone: ${order.phone}\n\nNote:\n\n${order.notes}`,
        html: `<b>New torso order received</b><br><br><b>Date: ${order.inserted}</b><br><br><b>Email: ${order.email}</b><br><br><b>Name: ${order.name}</b><br><br><b>Phone: ${order.phone}</b><br><br><b>Note:</b><br><br><b>${order.notes}</b>`,
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
    try {
        await sgMail.send(msg);
    } catch(err) {
        console.error(err);
    }
}

export const newBrickEmail = async (order, preview, mask) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const emails = (await prisma.notificationEmails.findMany()).map(e => e.email);
    if (emails.length < 1) {
        return;
    }
    const msg = {
        from: process.env.SENDGRID_SENDER,
        subject: 'Lego Customizer - New Brick Order',
        text: `New Brick order received\n\nDate: ${order.inserted}\n\nEmail: ${order.email}\n\nName: ${order.name}\n\nPhone: ${order.phone}\n\nNote:\n\n${order.notes}`,
        html: `<b>New brick order received</b><br><br><b>Date: ${order.inserted}</b><br><br><b>Email: ${order.email}</b><br><br><b>Name: ${order.name}</b><br><br><b>Phone: ${order.phone}</b><br><br><b>Note:</b><br><br><b>${order.notes}</b>`,
        attachments: [
            {
              content: preview,
              filename: "preview.png",
              type: "image/png",
              disposition: "attachment"
            },
            {
                content: mask,
                filename: "mask.png",
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
    try {
        await sgMail.send(msg);
    } catch(err) {
        console.error(err);
    }
}
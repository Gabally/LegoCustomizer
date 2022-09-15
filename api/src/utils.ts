import path from "path";
import { writeFile, unlink } from "fs/promises"
import { existsSync, mkdirSync } from "fs"
import { CronJob } from "cron";
import { default as sgMail } from "@sendgrid/mail";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const cleanFiles = (front, back) => {
    unlink(path.join('public', 'uploads', front));
    unlink(path.join('public', 'uploads', back));
}

export const writeB64Image = async (url, out) => {
    const dir = path.dirname(out);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
    let base64Data = url.replace(/^data:image\/png;base64,/, "");
    if (Buffer.from(base64Data, 'base64').toString('base64') !== base64Data) {
        throw "Invalid Base64 data";
    }
    await writeFile(out, base64Data, 'base64');
}

export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const randomString = (len) => {
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

export const scheduleSendGridEmails = () => {
    /*0 10 * * Sun*/
    const job = new CronJob(
        "0 10 * * Sun",
        async function () {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const emails = (await prisma.notificationEmails.findMany()).map(e => e.email);
                if (emails.length < 1) {
                    return;
                }
                const msg = {
                    from: process.env.SENDGRID_SENDER,
                    subject: 'Lego Customizer - Sendgrid KeepAlive',
                    text: "* ignorare*\nQuesto messaggio ha il solo scopo di prevenire la disattivazione del servizione di email, e non richiede nessuna azione.",
                    html: `<b>* Ignorare *</b><br>Questo messaggio ha il solo scopo di prevenire la disattivazione del servizione di email, e non richiede nessuna azione.`,
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
            
        });
    job.start();
} 
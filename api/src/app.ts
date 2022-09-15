import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import session from 'express-session';
import MemoryStoreCreator from 'memorystore';
import { router } from './router';
import { scheduleSendGridEmails } from './utils';

const MemoryStore = MemoryStoreCreator(session);

const app = express();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "An unknow error occured" }).end();
});

app.use(express.json({ limit: '10mb' }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MemoryStore({
        checkPeriod: 86400000
    }),
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    }
}));

app.use('/api', router);

app.use('/public', express.static('public'));

if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_SENDER) {
    console.error('You need to se the sengrid env variables, or emails wont work');
}

scheduleSendGridEmails();

app.listen(process.env.APP_PORT, () => {
    console.log(`App listening on port ${process.env.APP_PORT}!`)
});
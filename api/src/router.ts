import * as orders from "./controllers/order";
import * as torso from "./controllers/torso";
import * as brick from "./controllers/brick";
import * as emails from "./controllers/emails";
import * as auth from "./controllers/auth";
import express from "express"
import urls from "../urls.json";
import { isAuthenticated } from "./middleware";

export const router = express.Router();

router.post(urls.SUBMIT_ORDER, orders.submitOrder);
router.get(urls.READ_ORDERS, isAuthenticated, orders.readOrders);
router.delete(urls.DELETE_ORDER, isAuthenticated, orders.deleteOrder);

router.post(urls.SUBMIT_TORSO, torso.submitTorso);
router.get(urls.READ_TORSOS, isAuthenticated, torso.readTorsos);
router.delete(urls.DELETE_TORSO, isAuthenticated, torso.deleteTorso);

router.post(urls.SUBMIT_BRICK, brick.submitBrick);
router.get(urls.READ_BRICKS, isAuthenticated, brick.readBricks);
router.delete(urls.DELETE_BRICK, isAuthenticated, brick.deleteBrick);

router.get(urls.READ_NOTIFICATION_EMAILS, isAuthenticated, emails.getNotificationEmails);
router.post(urls.ADD_NOTIFICATION_EMAILS, isAuthenticated, emails.addNotificationEmail);
router.delete(urls.DELETE_NOTIFICATION_EMAIL, isAuthenticated, emails.deleteNotificationEmail);

router.post(urls.SET_CREDENTIALS, auth.setCredentials);
router.post(urls.LOGIN, auth.login);
router.post(urls.UPDATE_PASSWORD, isAuthenticated, auth.updatePassword);
router.get(urls.CAN_LOGIN, auth.canLogin);

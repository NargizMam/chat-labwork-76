import express from "express";
import {Message, MessageWithoutId} from "../types";
import fileDb from "../fileDb";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getMessages();
    let sentMessages: Message[] | null;
    if (req.query.datetime) {
        const queryDate = req.query.datetime as string;
        const messagesIndex = messages.findIndex(msg => msg.datetime > queryDate);
        sentMessages = messagesIndex === -1 ? [] : messages.slice(messagesIndex);
    } else {
        sentMessages = messages.slice(-30).reverse();
    }
    res.send(sentMessages);
});
messagesRouter.post('/', async (req, res) => {
    if (!req.body.author || !req.body.message) {
        return res.status(400).send({error: 'Enter correct data!'});
    }

    const messagesData: MessageWithoutId = {
        author: req.body.author,
        message: req.body.message,
        datetime: (new Date()).toISOString(),
    };
    const message = await fileDb.addMessage(messagesData);
    return res.send(message);
});

export default messagesRouter;
import express from 'express';
import cors from "cors";
import fileDb from "../chat-api/fileDb";
import messagesRouter from "./routers/messages";

const port = 8000;
const app = express();

app.use(express.json())
app.use(cors());
app.use('/messages', messagesRouter);


const run = async () => {
    await fileDb.init();
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
};

run().catch(console.error);
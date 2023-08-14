import {promises as fs} from 'fs';
import {randomUUID} from 'crypto';
import {Message, MessageWithoutId} from "./types";

const filename = './db.json';
let data: Message[] = [];

const fileDb = {
   async init() {
        try {
            const fileContents: any = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    getMessages() {
        return data;
    },
    async addMessage(messageData: MessageWithoutId) {
        const id = randomUUID();

        let message: Message = {
            id,
            ...messageData
        };
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
       await fs.writeFile(filename, JSON.stringify(data));
    }
};

export default fileDb;
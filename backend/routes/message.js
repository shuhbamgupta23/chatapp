import express from 'express'
import { sendMessage, getMessage } from '../controller/message.js';


const router = express.Router()

router.post("/message",sendMessage);
router.get('/message/:user1Id/:user2Id',getMessage)


export default router
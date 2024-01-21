import express from 'express'

import { login } from '../controllers/auth.js'
import { updateChannelData, getAllChannels } from '../controllers/channel.js'
// import { getAllChannels } from '../controllers/channel.js';


const router = express.Router();

router.post('/login', login);
// router.post('/signup', signup);
router.patch('/update/:id', updateChannelData);
router.get('/getAllChannels', getAllChannels);

export default router;
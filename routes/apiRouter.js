import url from 'url';
import express from 'express';
import needle from 'needle';
import dotenv from 'dotenv';
import apicache from 'apicache';

dotenv.config();

const BASE_URL = process.env.API_BASE_URL;
const KEY_NAME = process.env.API_KEY_NAME;
const API_KEY = process.env.API_KEY;

// Initialize cache
let cache = apicache.middleware;

const apiRouter = express.Router()

apiRouter.get('/', cache('2 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [KEY_NAME]: API_KEY,
            ...url.parse(req.url,  true).query
        })
        const apiRes = await needle('get', `${BASE_URL}?${params}`);
        const data = apiRes.body;

        // Log request to public API
        if(process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${BASE_URL}?${params}`)
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
})


export default apiRouter;
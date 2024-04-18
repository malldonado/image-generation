import express from 'express';
import dotenv from 'dotenv';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "",
});

dotenv.config();

const router = express.Router();

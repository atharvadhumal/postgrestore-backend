import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import "dotenv/config";

//init arcjet

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        shield({ mode: "LIVE" }),  // Shield protects your app from common attacks e.g. SQL injection
        detectBot({
            mode: "LIVE", // Create a bot detection rule
            allow: [
                "CATEGORY:SEARCH_ENGINE" //will only allow searchengine and block all the bots
            ]
        }),
        //Create a token bucket rate limit
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, // Refill 5 tokens per interval
            interval: 10, // Refill every 10 seconds
            capacity: 10 // Bucket capacity of 10 tokens
        })
    ]
})
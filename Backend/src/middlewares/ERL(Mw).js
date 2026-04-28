import ERL from "express-rate-limit";

export const limiter = ERL({
    windowMs: 15 * 60 * 1000, // 15 minute
    max: 20, // limit each IP to 20 requests per windowMs
    message: 'Too many requests, please try again later.'
});

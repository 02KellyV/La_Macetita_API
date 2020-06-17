const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
    const token = req.headers.authorization;
    if (token){
        jwt.verify(token, "123kelly", (err, user) => {
            if (err){
                res.sendStatus(403); //Mean not auth
            }
            req.user = user;
            next();
        });
    }else {
        res.sendStatus(401);
    }
});
module.exports = router;
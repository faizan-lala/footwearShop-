const { request, response } = require("express");
 const jwt=require('jsonwebtoken');
exports.verifyToken = (request, response, next) => {
    try {
        if (!request.headers.authorization)
            return response.status(401).send('unauthorized request');
            console.log(err);

        if (request.headers.authorization === null)
            return response.status(401).send('unauthorized request');
            console.log(err);

        let token = request.headers.authorization.split(" ")[1];
        let payload = jwt.verify(token, 'fjhdfjsghkjsgskjgskjgkjjfh');
        next();
    } catch (err) {
        return response.status(401).send('unauthorized request');
    }

}
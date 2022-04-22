const adminModel=require('../model/admin.model');
const jwt = require('jsonwebtoken');
const token = require('../middleware/token.varification');


exports.SignUp=(request, response) => {
    adminModel.create(request.body).then(result => {
        console.log(result);
        return response.status(200).json(result);
    }).catch(err => {
        return response.status(500).json({ message: 'Something went wrong' });
    })
};

exports.SignIn=(request, response) => {
    adminModel.findOne({ email: request.body.email, password: request.body.password }).then(result => {
        if (result) {
            let payload = { subject: result._id };
            let token = jwt.sign(payload, 'fjhdfjsghkjsgskjgskjgkjjfh');
            return response.status(200).json({
                status: 'login success',
                current_user: result,
                token: token
            });
        }
        else
            return response.status(404).json({ message: 'Invalid user' })
    }).catch(err => {
        return response.status(500).json({ message: 'Oops something went wrong' });
    })
};
const User =  require('../models/user');
const bcrypt =  require('bcrypt');
const jwtoken =  require('jsonwebtoken');
const script =  require('../js/script');

exports.signup = (req, res, next) => {
    const value = script.checkPassword(req.body.password);
    if(value.conditional == true){
        bcrypt.hash(req.body.password,10).then(
            (hash) => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                });
                user.save().then(
                    () => {
                        res.status(201).json({
                            message: 'User added successfully'
                        })
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            message: error
                        })
                    }
                )
            }
        )
    }else{
        res.status(500).json({
            message: value.message
        })
    }
    
    }
exports.login = (req, res, next) => {
    const fs = require('fs');
fs.unlink('../assets/mayo.jpeg', () => {
    console.log("ELIMINADO")
});
    User.findOne({email: req.body.email}).then(
        (user)=> {
        if(!user){
            return res.status(401).json({
            error : new Error('User not found')
            });
        }
        bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
                if(!valid){
                    return res.status(401).json({
                        error: new Error('Incorrect Password')
                    });
                }
                const token = jwtoken.sign(
                    {userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24H'});
                res.status(201).json({
                    userId: user._id,
                    token: token
                });
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    error: "error"
                });
            }
        );
        }

    ).catch(
        (error) => {
            res.status(500).json({
                error: "error"
            });
        }
    );
};

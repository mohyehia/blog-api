const mongoose = require('mongoose');
const User = require('../entity/user.entity');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    User.find({email: req.body.email})
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json({error: 'This email address already exists!'});
            } else {
                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(user => {
                                console.log(user);
                                res.status(201).json({
                                    message: 'User created successfully!',
                                    createdUser: {
                                        id: user._id,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email,
                                        joined: user.joined
                                    }
                                });
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).json({error: err});
                            });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

exports.login = (req, res, next) => {
    User.find({email: req.body.email})
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Invalid Credentials!'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid Credentials!'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            id: user[0]._id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: process.env.JWT_EXPIRATION
                        });
                    return res.status(200).json({
                        message: 'Authentication succeeded!',
                        token: token,
                        user: {
                            id: user[0]._id,
                            email: user[0].email,
                            firstName: user[0].firstName,
                            lastName: user[0].lastName,
                            address: user[0].address,
                            job: user[0].job,
                            mobile: user[0].mobile,
                            phone: user[0].phone
                        }
                    });
                }
                return res.status(401).json({
                    message: 'Invalid Credentials!'
                });
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err});
        });
}

exports.update = (req, res, next) => {
    const {userData} = req;
    User.findOneAndUpdate({_id: userData.id}, {
        $set:
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                mobile: req.body.mobile,
                job: req.body.job,
                address: req.body.address
            }
    }, {upsert: true, new: true})
        .then((doc, err) => {
            if(err){
                res.status(500).json({error: err});
            }
            res.status(200).json({
                message: 'User profile updated successfully!',
                user: {
                    id: doc._id,
                    email: doc.email,
                    firstName: doc.firstName,
                    lastName: doc.lastName,
                    address: doc.address,
                    job: doc.job,
                    mobile: doc.mobile,
                    phone: doc.phone
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}
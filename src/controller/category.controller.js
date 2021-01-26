const mongoose = require('mongoose');
const Category = require('../entity/category.entity');

exports.retrieveAllCategories = (req, res, next) => {
    Category.find()
        .select('_id name')
        .then(categories => {
            res.status(200).json({
                count: categories.length,
                categories: categories.map(cat => {
                    return {
                        id: cat._id,
                        name: cat.name,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/categories/' + cat._id
                        }
                    }
                })
            });
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    });
}

exports.createNewCategory = (req, res, next) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    category.save().then(cat => {
        console.log(cat);
        res.status(201).json({
            message: 'Category created successfully!',
            createdProduct: {
                id: cat._id,
                name: cat.name,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/products/' + cat._id
                }
            }
        });
    })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err});
        });
}
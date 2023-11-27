const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const sharp = require('sharp');
// set up multer storage


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

const upload = multer({ storage: storage });


// CREATE a product

router.post('/', upload.single('image'), async (req,res) => {
    try {
        const newProduct = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
        });

        // Resize image before saving
        if (req.file) {
            const imagePath = req.file.path;
            const resizedImage = await sharp(imagePath)
                .resize(800, 600) // Change the dimensions as per your requirement
                .toBuffer();
            await sharp(resizedImage).toFile(imagePath);
            newProduct.image = req.file.filename;
        }

        await newProduct.save();

        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// READ all projects
router.get('/', async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// get single product

router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
});


// UPDATE a product
// UPDATE a product
router.patch('/:id', getProduct, upload.single('image'), async (req, res) => {
    if (req.body.title != null) {
        res.product.title = req.body.title;
    }
    if (req.body.description != null) {
        res.product.description = req.body.description;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }

    try {
        // Delete old image if a new image is uploaded
        if (req.file) {
            const oldImagePath = path.join('./public/images', res.product.image);
            
            // Asynchronously delete the old image
            await new Promise((resolve, reject) => {
                fs.unlink(oldImagePath, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            // Resize and save the new image
            const resizedImage = await sharp(req.file.path)
                .resize(800, 600)
                .toBuffer();
            await sharp(resizedImage).toFile(req.file.path);

            // Update the product with the new image filename
            res.product.image = req.file.filename;
        }

        const updatedProduct = await res.product.save();
        res.json(updatedProduct);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// DELETE a product
router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      // Delete associated image file from server
      const imagePath = path.join('./public/images', product.image);
      fs.unlinkSync(imagePath); // Delete image file
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

async function getProduct(req, res, next ) {
    try {
        const product = await Product.findOne({ _id: new ObjectId(req.params.id) });
        if (product == null) {
            return res.status(404).json({message: 'Can not find Product'})
        }
        res.product = product;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = router;


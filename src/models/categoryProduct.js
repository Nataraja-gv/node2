const mongoose = require("mongoose");

const categoryProduct = new mongoose.Schema({

    product_image: {
        type: String,
        required: true
    }

}, { timestamps: true })

const ProductCategory = mongoose.model("category_product", categoryProduct);

module.exports = ProductCategory;
const express = require('express')
const mongoose = require ('mongoose')
const Product = require('../Model/product')
const User = require("../Model/user")
const {pupload} = require('../multer')
const router = express.Router()
const path = require('path');

const validateProductData=(data)=>{
    const errors = [];

    if (!data.name) errors.push('Product name is required');
    if (!data.description) errors.push('Product description is required');
    if (!data.category) errors.push('Product category is required');
    if (!data.price || isNaN(data.price) || data.price <= 0) errors.push('Valid product price is required');
    if (!data.stock || isNaN(data.stock) || data.stock < 0) errors.push('Valid product stock is required');
    if (!data.email) errors.push('Email is required');

    return errors;
}

router.post('/createProduct',pupload.array('images',10),async(req,res)=>{
   
    const  {name ,description,price,stock,email,category}=req.body
    const images = req.files.map((file) => `${path.basename(file.path)}`);// for storing image path in mongodb cause we cant store image mongodb..mongodb support json data not image

    // const validationErrors = validateProductData({ name, description, category, price, stock, email });
    // if (validationErrors.length > 0) {
    //     return res.status(400).json({ errors: validationErrors });
    // }

    // if (images.length === 0) {
    //     return res.status(400).json({ error: 'At least one image is required' });
    // }

    try {
        //  const user = await User.findOne({ email });
        //  if (!user) {
        //      return res.status(400).json({ error: 'Email does not exist in the users database' });
        //  }
        if(!name ||!description ||!category||!price||!stock||!email)
            return res.status(400).json("all required")

        const newProduct = new Product({
            name,
            description,
            category,
            tags,
            price,
            stock,
            email,
            images,
        });

        await newProduct.save();
     console.log(newProduct)
        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error. Could not create product.' });
    }
});



module.exports = router;


router.get('/get-products', async (req, res) => {
    try {
        const products = await Product.find();
        const productsWithFullImageUrl = products.map(product => {
            if (product.images && product.images.length > 0) {
                product.images = product.images.map(imagePath => {
                    // Image URLs are already prefixed with /products
                    return imagePath

                });
            }
            return product;
        })

        res.status(200).json({ products: productsWithFullImageUrl })}

        catch (err) {
            console.error(' Server error:', err);
            res.status(500).json({ error: 'Server error. Could not fetch products.' });
        }
    })
    router.get('/my-products', async (req, res) => {
        const {email} = req.query
        try {
            const products = await Product.find({email});
if(!products)
    return res.status(400).send('email not found')
            const productsWithFullImageUrl = products.map(product => {
                if (product.images && product.images.length > 0) {
                    product.images = product.images.map(imagePath => {
                        // Image URLs are already prefixed with /products
                        return imagePath
    
                    });
                }
                return product;
            })
            res.status(200).json({ products: productsWithFullImageUrl })}
    
            catch (err) {
                console.error(' Server error:', err);
                res.status(500).json({ error: 'Server error. Could not fetch products.' });
            }
        })
        router.get('/product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Server error. Could not fetch product.' });
    }
});


 router.put('/update-product/:id',pupload.array('images',10), async(req,res)=>{
    try{
     const {id}=req.params
     const  {name ,description,price,stock,email,category}=req.body
     const images = req.files.map((file) => `${path.basename(file.path)}`)
       

     const updateProduct =  new Product({name ,description,price,stock,email,category,images})
     await Product.findByIdAndUpdate(id,updateProduct,{new:true})
     res.status(200).json({products:updateProduct})
    }
    catch(e){
        res.status(500).send(e.message)
    }
 })
 router.delete('/delete-product/:id', async(req,res)=>{
    try{
     const {id}=req.params
     
     const delProduct=await Product.findByIdAndDelete(id)
     res.status(200).json({products:delProduct})
    }
    catch(e){
        res.status(500).send(e.message)
    }
 })

 router.get('/cartProduct',async(req,res)=>{
    const {email} = req.query
    try{
        if(!email){
            res.status(404).send("login to add to cart ")
        }
        const user = await User.findOne({email}).populate({path:"cart.productId",model:"Product"})
        if(!user)
            res.status(400).send("register to add to cart")
        res.status(200).json({
            message:"cart retrived successfully",
            cart:user.cart
        })

    }catch(e){
        console.error("server error",e)
        res.status(500).json({error:"Server error"})
    }
 })
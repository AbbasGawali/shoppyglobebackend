import Product from "../models/Product.js";
import User from "../models/User.js";
import UserCart from "../models/UserCart.js";

export const getCartItems = async (req, res) => {
    try {

        const result = await UserCart.find();
        res.status(200).json({ success: true, messge: "All Cart Item List", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}


export const getSingleCartItem = async (req, res) => {
    let id = req.params.id;

    try {

        const result = await UserCart.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Cart Item not found" });
        }
        res.status(200).json({ success: true, messge: "Cart Item Found", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}



export const addCartItem = async (req, res) => {
    if (!req.body.user) {
        return res.status(403).json({ success: false, message: "User is required" });
    }
    if (!req.body.product) {
        return res.status(403).json({ success: false, message: "Product is required" });
    }
    if (!req.body.quantity) {
        return res.status(403).json({ success: false, message: "Quantity is required" });
    }

    const { product, quantity, user } = req.body;

    try {
        //check this
        const isMatch = await Product.findById(product);
        const isUserMatch = await User.findById(product);

        if (!isUserMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const result = await UserCart.create({ quantity, product, user });
        res.status(201).json({ success: true, message: "Cart Item added successfully", result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }

}

export const updateCartItem = async (req, res) => {
    let id = req.params.id;
    try {
        const isMatch = await UserCart.findById(id);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Cart Item not found" });
        }
        const result = await UserCart.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, messge: "Cart Item updated successfully", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }

}

export const deleteCartItem = async (req, res) => {
    let id = req.params.id;
    try {
        const isMatch = await UserCart.findById(id);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Cart Item not found" });
        }
        const result = await UserCart.findByIdAndDelete(id);
        res.status(200).json({ success: true, messge: "Cart Item deleted successfully", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }

}
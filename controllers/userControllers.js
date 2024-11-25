import User from "../models/User.js";
import JWT from "jsonwebtoken"

export const getAllUsers = async (req, res) => {

    try {

        const result = await User.find();
        res.status(200).json({ success: true, messge: "All Users List", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

export const getSingleUser = async (req, res) => {
    let id = req.params.id;

    try {

        const result = await User.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, messge: "User Found", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

export const addUser = async (req, res) => {
    if (!req.body.name) {
        return res.status(403).json({ success: false, message: "Name is required" });
    }
    if (!req.body.email) {
        return res.status(403).json({ success: false, message: "Email is required" });
    }
    if (!req.body.password) {
        return res.status(403).json({ success: false, message: "Password is required" });
    }
    if (!req.body.address) {
        return res.status(403).json({ success: false, message: "Address is required" });
    }

    const { name, email, password, address } = req.body;


    try {

        console.log(process.env.JWTSECRET)
        const accessToken = JWT.sign(email, process.env.JWTSECRET);
        const result = await User.create({ name, email, password, address });
        res.status(201).json({ success: true, message: "User added successfully", result: { ...result, accessToken } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}




console.log("jwt sec", process.env.JWTSECRET)
 


export const updateUser = async (req, res) => {
    let id = req.params.id;
    try {
        const isMatch = await User.findById(id);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const result = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, messge: "User updated successfully", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}


export const deleteUser = async (req, res) => {
    let id = req.params.id;
    try {
        const isMatch = await User.findById(id);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const result = await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, messge: "User deleted successfully", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
} 
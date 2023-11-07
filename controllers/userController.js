const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
    try {
        if (
            !req.body.email &&
            !req.body.firstName &&
            !req.body.lastName &&
            !req.body.phone &&
            !req.body.password
        ) {
            throw new Error("Content can not be empty!");
        }

        const { email, firstName, lastName, password, phone } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            throw new Error("User already exists!");
        }

        const salt = await bcrypt.genSalt(10);

        const newPassword = await bcrypt.hash(password, salt);

        const payload = {
            email,
            firstName,
            lastName,
            phone,
            password: newPassword,
        };

        user = new User(payload);

        await user.save();

        return res.status(201).json({
            status: true,
            message: "User created successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            status: true,
            message: "Users fetched successfully!",
            data: users,
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const findSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({
            status: true,
            message: "User fetched successfully!",
            data: user,
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const updateUser = async (req, res) => {
    try {
        if (
            !req.body.email &&
            !req.body.firstName &&
            !req.body.lastName &&
            !req.body.phone
        ) {
            throw new Error("Content can not be empty!");
        }

        const { email, firstName, lastName, phone } = req.body;

        let payload = {
            email,
            firstName,
            lastName,
            phone,
        };

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            payload.password = await bcrypt.hash(req.body.password, salt);
        }

        const id = req.params.id;

        let user = User.findById(id);
        if (!user) {
            throw new Error("User not found!");
        }

        await User.findByIdAndUpdate(id, payload, { useFindAndModify: false });

        return res.status(200).json({
            status: true,
            message: "User updated successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        let user = User.findById(id);
        if (!user) {
            throw new Error("User not found!");
        }
        await User.findByIdAndDelete(id, payload, { useFindAndModify: false });

        return res.status(200).json({
            status: true,
            message: "User deleted successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

module.exports = {
    createUser,
    findAllUsers,
    findSingleUser,
    updateUser,
    deleteUser,
};

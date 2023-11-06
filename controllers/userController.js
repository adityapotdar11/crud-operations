const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
    if (
        !req.body.email &&
        !req.body.firstName &&
        !req.body.lastName &&
        !req.body.phone &&
        !req.body.password
    ) {
        return res.status(400).json({
            state: false,
            message: "Content can not be empty!",
        });
    }

    const { email, firstName, lastName, password, phone } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                state: false,
                message: "User already exists!",
            });
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

        await user.save().then((data) => {
            return res.status(200).json({
                state: true,
                message: "User created successfully!",
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            state: true,
            message: "Something went wrong!",
        });
    }
};

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length) {
            return res.status(200).json({
                status: true,
                message: "Users fetched successfully!",
                data: users,
            });
        } else {
            return res.status(404).json({
                status: false,
                message: "Users not found!",
                data: [],
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong!",
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
        return res.status(404).json({
            status: false,
            message: "User not found!",
            data: [],
        });
    }
};

const updateUser = async (req, res) => {
    if (
        !req.body.email &&
        !req.body.firstName &&
        !req.body.lastName &&
        !req.body.phone
    ) {
        return res.status(400).json({
            state: false,
            message: "Content can not be empty!",
        });
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

    await User.findByIdAndUpdate(id, payload, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: "User not found!",
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: "User updated successfully!",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                status: true,
                message: "Something went wrong!",
            });
        });
};
const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: "User not found!",
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: "User deleted successfully!",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                status: false,
                message: "Something went wrong!",
            });
        });
};

module.exports = {
    createUser,
    findAllUsers,
    findSingleUser,
    updateUser,
    deleteUser,
};

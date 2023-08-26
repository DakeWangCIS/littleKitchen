const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtConfig = require('../config/jwtConfig.js');

// define a router to retrieve all the users' information
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.send({
            status: "ok",
            data: allUsers
        })
    } catch (err) {
        console.error('Error occurred during query:', err);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
};

// define a router to retrieve a user's information by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(+req.params.id);
        if (!user) {
            return res.status(403).send({
                status: "error",
                message: "User not found."
            });
        }
        res.send({
            status: "ok",
            data: user
        });
    } catch (err) {
        console.error('Error occurred during query:', err);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
};

// define a router to retrieve a user's information by name
exports.getUserByName = async (req, res) => {
    try {
        const user = await User.findOneByUsername({where: {name: req.params.name}});
        if (!user) {
            return res.status(403).send({
                status: "error",
                message: "User not found."
            });
        }
        res.send({
            status: "ok",
            data: user
        });
    } catch (err) {
        console.error('Error occurred during query:', err);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a router to register a user
// define a router to register a user
exports.register = async (req, res) => {
    const {
        username,
        password,
        email,
        address,
        phone = null,  // default to null if not provided
    } = req.body;

    // verify the data
    if (
        !username || typeof username !== 'string' ||
        !password || typeof password !== 'string' ||
        !email || typeof email !== 'string' ||
        !address || typeof address !== 'string' ||
        (phone && typeof phone !== 'string')
    ) {
        return res.status(403).send({
            status: "error",
            message: "Invalid user data provided."
        });
    }

    // Converts current date to MySQL datetime format
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
        // Check if email already exists
        if (await User.emailExists(email)) {
            return res.status(400).send({
                status: "error",
                message: "Email address is already registered.",
                auth: false,
                token: null
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const results = await User.create({
            username,
            password: hashedPassword,
            email,
            address,
            phone_number: phone,
            createDate: currentDate,
            lastLoginDate: currentDate,
            isAdmin: false
        });

        const token = jwt.sign({id: results.insertId}, jwtConfig.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({
            status: "ok",
            message: "User created.",
            auth: true,
            token: token
        });
    } catch (err) {
        console.error('Error registering the user:', err);
        res.status(500).send({
            status: "error",
            message: "There was a problem registering the user.",
            auth: false,
            token: null
        });
    }
};

// define a router to delete a user
exports.deleteStudent = (req, res) => {
    const id = +req.params.id;
    const index = STU_ARR.findIndex(stu => stu.id === id);
    if (index === -1) {
        res.status(403).send({
            status: "error",
            message: "Student not found."
        });
    } else {
        STU_ARR.splice(index, 1);
        res.send({
            status: "ok",
            message: "Student deleted.",
            data: STU_ARR[index]
        });
    }
};

// define a router to update a student
exports.updateStudent = (req, res) => {
    const {id, name, age, gender, address} = req.body;
    const updatedStu = STU_ARR.find(stu => stu.id === id);

    if (updatedStu) {
        updatedStu.name = name;
        updatedStu.age = age;
        updatedStu.gender = gender;
        updatedStu.address = address;

        res.send({
            status: "ok",
            message: "Student updated.",
            data: updatedStu
        });
    } else {
        res.status(403).send({
            status: "error",
            message: "Student not found."
        });
    }
};
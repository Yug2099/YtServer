import jwt from "jsonwebtoken"
import users from '../models/auth.js'
import axios from 'axios';

export const login = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            try {
                const response = await axios.post("/user/login", { email });
                console.log('Response:', response);
                const newUser = await users.create({ email });

                const token = jwt.sign({
                    email: newUser.email, id: newUser._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                })
                res.status(200).json({ result: newUser, token })
            } catch (error) {
                res.status(500).json({ mess: "Something wents wrong..." });
                console.error('AxiosError:', error);
                console.error('Response:', error.response);
            }
        } else {

            const token = jwt.sign({
                email: existingUser.email, id: existingUser._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })
            res.status(200).json({ result: existingUser, token })
        }
    } catch (error) {
        res.status(500).json({ mess: "something wents wrong..." })
    }
}

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user with the given email already exists
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Create a new user
        const newUser = await users.create({ name, email, password });

        // Generate a token for the new user
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ result: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong...' });
    }
};
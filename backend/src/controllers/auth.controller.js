import prisma from "../prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;

//POST /api/auth/register

export const register = async(req, res) => {
    try{
        const { name, email, password } = req.body;

        //basic validation
        if (!email || !password) {
            return res.status(400).json({message: "Email and password required"})
        }

        const existingUser = await prisma.user.findUnique({
            where: {email}
        });

        if(existingUser){
            return res.status(409).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error "});
    }
};

//POST /api/auth/login

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err){
        console.log(err)
        res.status(500).json({message: "Server Error"})
    }
}
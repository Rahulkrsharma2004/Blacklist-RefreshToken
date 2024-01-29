const express = require("express")
const dotenv = require("dotenv").config()
const { connection } = require("./db")
const jwt = require("jsonwebtoken")
const { auth } = require("./Middlewares/authMiddleware")
const { authRouter } = require("./Routes/authRoute")
const cookieParser = require("cookie-parser")
const {BlacklistToken}  = require("./Models/blacklist")

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser());
app.use("/users", authRouter)

app.get("/", (req, res) => {
    res.send("Home page")
})


app.get("/movie", auth, (req, res) => {
    res.status(200).send({ "data": "Movies Data...." })
})

app.get("/logout", auth , async (req, res) => {
    try {

        const token = req.cookies.ACCESS_TOKEN
        const blacklistToken = new BlacklistToken({token})
        await blacklistToken.save()
        res.status(200).send("Logout Successfully")

    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Express server running on port ${PORT} and db is also connected`)

    } catch (error) {
        console.log(error)
    }

})
import Users from "../models/user.schema.js"

export const SignIn = async (req, res) => {
    await Users.create(req.body)
    res.json({message:"hello"})
}


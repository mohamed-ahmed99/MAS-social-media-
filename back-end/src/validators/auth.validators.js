import { body} from "express-validator"
import { validator } from "../middlewares/validator.js"


const registerSchecma = {
    firstName: body("personalInfo.firstName")
        .notEmpty().withMessage("firstName is required")
        .isString().withMessage("firstName must be string")
        .isLength({min:2}).withMessage("firstName must be at least 2 characters"),

    lastName: body("personalInfo.lastName")
        .notEmpty().withMessage("lastName is required")
        .isString().withMessage("lastName must be string")
        .isLength({min:2}).withMessage("lastName must be at least 2 characters"),
        
    gender: body("personalInfo.gender")
        .notEmpty().withMessage("gender is required")
        .isString().withMessage("gender must be string"),

    address: body("personalInfo.address")
        .notEmpty().withMessage("address is required")
        .isString().withMessage("address must be string")
        .isLength({min:2}).withMessage("address must be at least 2 characters"),

    phoneNumber: body("contactInfo.phoneNumber")
        .notEmpty().withMessage("phoneNumber is required")
        .isString().withMessage("phoneNumber must be string")
        .isLength({min:10}).withMessage("phoneNumber must be at least 10 characters")
        .isLength({max:15}).withMessage("phoneNumber must not be more than 15 characters"),
        
    email: body("contactInfo.email")
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("Invalid email")
        .isString().withMessage("email must be string"),

    password: body("account.password")
        .notEmpty().withMessage("password is required")
        .isString().withMessage("password must be string")
        .isStrongPassword({minLength: 8,minLowercase: 1,minUppercase:0, minNumbers: 1,minSymbols: 1})
        .withMessage("Password must be at least 8 chars, include 1 lowercase, 1 number, 1 symbol"),
}

const signInSchema = {
    email: body("email")
        .notEmpty().withMessage("email is rquired")
        .isEmail().withMessage("Invalid email"),
        
    password: body("password")
        .notEmpty().withMessage("password is rquired")
        .isLength({min:8}).withMessage("short password"),
}


// create middleware
export const registerValidator = validator(registerSchecma)
export const signinValidator = validator(signInSchema)
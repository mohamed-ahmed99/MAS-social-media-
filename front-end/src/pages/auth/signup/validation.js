

/*
    Validate data
*/ 
export const validateSignup = (data) => {
    let errors = {}

    // validate first name
    if (!data.firstName.trim()) {
        errors.firstName = "First name is required" // no space
    }
    else if (data.firstName.trim().length < 2) {
        errors.firstName = "Invalid name" // less than 2 letters
    }
    else if (!/^[\p{L} ]+$/u.test(data.firstName.trim())) {
        errors.firstName = "Invalid name" // no numbers or symbols
    }

    // validate last name
    if (!data.lastName.trim()) {
        errors.lastName = "Last name is required" // no space
    }
    else if (data.lastName.trim().length < 2) {
        errors.lastName = "Invalid name" // less than 2 letters
    }
    else if (!/^[\p{L} ]+$/u.test(data.lastName.trim())) {
        errors.lastName = "Invalid name" // no numbers or symbols
    }

    // validate email
    if (!data.email) {
        errors.email = "Email is required" // no email
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Invalid email address" // not valid email
    }

    // validate phone number
    if (!data.phoneNumber) {
        errors.phoneNumber = "Phone number is required" // no phone number
    }
    else if (data.phoneNumber.length > 15 || data.phoneNumber.length < 10){
        errors.phoneNumber = "Invalid phone number" // not valid phone number
    }else if (!/^[0-9]+$/.test(data.phoneNumber)){
        errors.phoneNumber = "Invalid phone number" // not valid phone number
    }

    // validate password
    if (!data.password) {
        errors.password = "Password is required"
    }
    else if (!/^(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)) {
        errors.password = "Password must be at least 8 characters long and include number and symbol"
    }

    // validate confirm password
    if (!data.confirmPassword) {
        errors.confirmPassword = "Please confirm your password"
    }
    else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "Passwords do not match"
    }

    // validate gender
    if (!data.gender) {
        errors.gender = "Gender is required"
    }
    else if (!["male", "female"].includes(data.gender.toLowerCase())) {
        errors.gender = "Invalid gender"
    }

    if (!data.address.trim()) errors.address = "Address is required";

    return errors
}
    
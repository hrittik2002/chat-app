import bcryptjs from 'bcryptjs';

/**
 * Encrypt password
 */
export const encryptPassword = async(password)=>{
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(password,salt);
    return encryptedPassword;
}

/**
 * check wherere the entered password is correct or not
 */
export const matchPassword = async(enteredPassword,originalPassword) =>{
    return await bcryptjs.compare(enteredPassword, originalPassword);
}
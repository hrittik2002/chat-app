import axios from 'axios';
/**
 * Upload picture to cloudinary
 */
export const uplaodPicToCloudinary = async (file)=>{
    try{
        const formdata = new FormData();
        formdata.append("file",file);
        formdata.append("upload_preset","chat-App");
        formdata.append("cloud_name" , "dudem9bnz")
        const {data} = await axios.post("https://api.cloudinary.com/v1_1/dudem9bnz/image/upload",formdata);
        return data.url.toString();
    }
    catch(err){
        console.log(err);
    }

}

/**
 * Register a new user
 */
export const registerUser = async(name,email,password,pic)=>{
    try{
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const {data} = await axios.post("api/user/register",{name,email,password,pic},config);
        return data;
    }
    catch(err){
        console.log(err);
    }
}
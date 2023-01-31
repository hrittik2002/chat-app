import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  Button,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { registerUser, uplaodPicToCloudinary } from "../apiCalls";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  // picture upload to cloudinary
  const postDetails = async(pics) => {
    setLoading(true);

    // if pic is undefined the pop up an error
    if(pics === undefined){
      toast({
        title: 'Please select an image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false);
      return;
    }

    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const url = await uplaodPicToCloudinary(pics);
      if(url !== undefined){
        setPic(url);
      }
      console.log(url);
      console.log(pic);
      setLoading(false);
    }
    else{
      toast({
        title: 'Please select an image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false);
      return;
    }
  };

  // register user
  const submitHandler = async () => {
    setLoading(true);

    // in case any field not filled throw an error
    if(!name || !email || !password || !confirmPassword){
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false);
      return;
    }

    // check whether the password is same as confirpassword or not
    if(password !== confirmPassword){
      toast({
        title: 'password do not match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false);
      return;
    }
    const res = await registerUser(name, password , email , pic);
    if(res){
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      localStorage.setItem("userInfo" , JSON.stringify(res));
      setLoading(false);
      navigate("/chat");
    }
    else{
      toast({
        title: 'Error Occured',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px" color="black">
      {/* Name  */}
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeContent="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* Email */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeContent="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* Password  */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5ren">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              background="none"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Password  */}
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5ren">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              background="none"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Picture  */} 
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p="1.5"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      
      {/* Sign up Button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Register;

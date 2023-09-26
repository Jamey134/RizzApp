import { FormControl, FormLabel, VStack, Input, Stack, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from '@chakra-ui/react'



const Register = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [profilePic, setProfilePic] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast() // The toast component is used to give feedback to users after an action has taken place.

    const handleClick = () => setShow(!show);

    const postDetails = (profilePic) => {
        setLoading(true);
        if (profilePic === undefined) {
            toast({
                title: "Please Select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (profilePic.type === "image/jpeg" || profilePic.type === "image/png") {
            const data = new FormData();
            data.append("file", profilePic); // (key, value)
            data.append("upload_preset", "rizz-app");
            data.append("cloud_name", "jamey134");
            fetch("https://api.cloudinary.com/v1_1/jamey134/image/upload", {
                //configurations
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then(data => {
                    setProfilePic(data.url.toString()); //Double check this method
                    console.log(data);
                    setLoading(false);
                })
                // if an error occurs...
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
            //if the data aren't images...
        }
        else {
            toast({
                title: "Please Select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }

    };

    const submitHandler = () => { };

    return <VStack spacing="5px">
        <FormControl id="register" isRequired>
            <FormLabel>Name</FormLabel>
            <InputGroup>
                <Input type="Name" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />
            </InputGroup>

            {/* </FormControl> */}
            {/* <FormControl id="email" isRequired> */}
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />

        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Stack>
                <InputGroup>
                    <Input type={show ? "text" : "password"} placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width="4.0 rem">
                        <Button height="1.5rem" size={"sm"} onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Stack>

        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input type={show ? "text" : "password"} placeholder="Confirm Your Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <InputRightElement width="4.0 rem">
                    <Button height="1.5rem" size={"sm"} onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>

            {/* </FormControl>
        <FormControl id="url"> */}
            <FormLabel>Upload Your Picture</FormLabel>
            <InputGroup>
                <Input type="file" p={1.5} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
            </InputGroup>
        </FormControl>
        <Button colorScheme="messenger" width="100%" style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>
            Register</Button>
    </VStack>;
}



export default Register
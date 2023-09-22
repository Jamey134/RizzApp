import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import React, { useState } from "react";



const Login = () => {
    const [show, setShow] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleClick = () => setShow(!show);
    const submitHandler = () => { };

    return <VStack spacing="5px">
        <FormControl id="email" isRequired>
            <FormLabel>
                <Input placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
            </FormLabel>
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"} placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width="4.0 rem">
                        <Button height="1.5rem" size={"sm"} onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormLabel>
        </FormControl>
        <FormControl id="url">
            <FormLabel>Upload Your Picture</FormLabel>
            <Input type="file" p={1.5} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
        </FormControl>
        <Button colorScheme="green" width="100%" style={{ marginTop: 15 }} onClick={submitHandler}>
            Register
        </Button>
    </VStack>;
}
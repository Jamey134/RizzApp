import { FormControl, FormLabel, VStack, Input} from "@chakra-ui/react";
import React, { useState } from "react";



const Register = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [picture, setPicture] = useState()

    return <VStack spacing="5px">
        <FormControl>
            <FormLabel>
                <Input placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} />
            </FormLabel>
        </FormControl>
    </VStack>;
}
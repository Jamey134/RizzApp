import React from 'react'
import { IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Image, Text } from '@chakra-ui/react'

const ProfileModal = ({ user, children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return <>



        {children ? (<span onClick={onOpen}> {children} </span>) : (
            <IconButton
                display={{ base: "flex" }}
                icon={<i class="fa-sharp fa-solid fa-eye"></i>}
                onClick={onOpen}
            />
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize={"35px"} fontFamily={"Avantgarde"} display={"flex"} justifyContent={"center"}>{user.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image
                    borderRadius={"full"}
                    boxSize={"150px"}
                    src={user.profilePic}
                    alt={user.name}
                    />
                    <Text
                    fontFamily={{ base: "28px", medium: "30px"}}>

                    </Text>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    
                </ModalFooter>
            </ModalContent>
        </Modal>

    </>
}

export default ProfileModal
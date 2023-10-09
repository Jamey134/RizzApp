import React from 'react'
import { IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Image, Text } from '@chakra-ui/react'

const ProfileModal = ({ user, children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return <>



        {children ? (<span onClick={onOpen}> {children} </span>) : (
            <IconButton display={{ base: "flex" }} icon={<i class="fa-sharp fa-solid fa-eye"></i>} onClick={onOpen} />
        )}
        <Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent height={"400px"}>
                <ModalHeader fontSize={"35px"} fontFamily={"Futura"} display={"flex"} justifyContent={"center"}>{user.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-between"}>
                    <Image borderRadius={"full"} boxSize={"150px"} src={user.profilePic} alt={user.name} />
                    
                    <Text fontSize={{ base: "28px", md: "30px" }} fontFamily={"Futura"}>
                        Email: {user.email}
                    </Text>
                </ModalBody>

                <ModalFooter display={"flex"} justifyContent={"center"}>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>

    </>
}

export default ProfileModal
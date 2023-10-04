import React from 'react'
import { useState } from 'react'
import { Tooltip, Box, Button } from '@chakra-ui/react';


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchState, setSearchState] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();


    return (
        <>
            <Box>
                <Tooltip
                    label="Search Users to Chat"
                    hasArrow
                    placement='bottom-end'>
                    <Button variant={'ghost'}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </Button>
                </Tooltip>
            </Box>
        </>
    )
}

export default SideDrawer
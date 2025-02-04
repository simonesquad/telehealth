import {
    Box,
    Stack,
    Heading,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels
} from '@chakra-ui/react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminConsoleScreen = () => {
    const { userInfo } = useSelector((state) => state.user);
    const location = useLocation();

  return userInfo && userInfo.isAdmin ? (
    <Box p='20px' minH='100vh'>
        <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
            
        </Stack>
    </Box>) : <Navigate to='/' replace={true} />
};

export default AdminConsoleScreen;
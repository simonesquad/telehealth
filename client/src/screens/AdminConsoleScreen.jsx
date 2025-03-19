import {
    Box,
    Stack,
    Heading,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    OrdersTab
} from '@chakra-ui/react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UsersTab from '../components/UsersTab';

const AdminConsoleScreen = () => {
    const { userInfo } = useSelector((state) => state.user);
    const location = useLocation();

  return userInfo && userInfo.isAdmin ? (
    <Box p='20px' minH='100vh'>
        <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
        <Stack
            pr={{ base: '0', md: '14' }} 
            spacing={{ base: '8', md: '10' }} 
            flex='1.5' 
            mb={{ base: '12', md: 'none' }}>
            <Heading fontSize='2xl' variant='enclosed'>
                Admin consle
            </Heading>
            <Tabs size='md' variant='enclosed'>
                <TabList>
                <Tab>Users</Tab>
                <Tab>Products</Tab>
                <Tab>Reviews</Tab>
                <Tab>Orders</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <UsersTab />
                    </TabPanel>
                    <TabPanel>
                        <OrdersTab />
                    </TabPanel>
                    <TabPanel>
                        <ReviewsTab />
                    </TabPanel>
                    <TabPanel></TabPanel>
                    <TabPanel></TabPanel>
                    <TabPanel></TabPanel>
                </TabPanels>
            </Tabs>
            </Stack>
        </Stack>
    </Box>) : <Navigate to='/' replace={true} />
};

export default AdminConsoleScreen;
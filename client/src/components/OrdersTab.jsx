import {
    Box,
    TableContainer,
    Th,
    Tr,
    Table,
    Td,
    Thead,
    Tbody,
    Button,
    useDisclosure,
    Alert,
    Stack,
    Spinner,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Wrap,
    useToast
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder, resetErrorAndRemoval, setDelivered } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const OrdersTab = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [ orderToDelete, setOrderToDelete ] = useState('');
    const dispatch = useDispatch();
    const { error, loading, orders, deliveredFlag, orderRemoval } = useSelector((state) => state.admin);
    const { userInfo } = useSelector((state) => state.user);
    const toast = useToast();

    useEffect(() => {
        dispatch(getAllOrders())
        dispatch(resetErrorAndRemoval());
        if(orderRemoval) {
            toast({
                description: 'Order has been removed.',
                status: 'success',
                isClosable: true,
            });
        }

        if(deliveredFlag) {
            toast({
                description: 'Order has been delivered.',
                status: 'success',
                isClosable: true,
            });
        }
    }, [dispatch, toast, orderRemoval, deliveredFlag]);

    const openDeleteConfirmBox = (order) => {
        setOrderToDelete(order);
        onOpen();
    };

    const onSetToDelivered = (order) => {
        dispatch(resetErrorAndRemoval());
        dispatch(setDelivered(order._id));
    }

  return (
    <Box>
        {error && (
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Upps!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {loading ? (
            <Wrap justify='center'>
                <Stack direction='row' spacing='4'>
                    <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl'  />
                </Stack>
            </Wrap>
        ) : (
    <Box>
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Shipping</Th>
                        <Th>Items Ordered</Th>
                        <Th>Shipping Price</Th>
                        <Th>Total</Th>
                        <Th>Delivered</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {userList && 
                        userList.map((user) => (
                        <Tr key={user._id}>
                            <Td>
                                {user.name} {user._id === userInfo._id ? '(You)' : ''}
                            </Td>
                            <Td>{user.email}</Td>
                            <Td>{new Date(user.createdAt).toDateString()}</Td>
                            <Td>{user.isAdmin ? <CheckCircleIcon color='cyan.500' /> : ''}</Td>
                            <Td>
                                <Button 
                                    leftIcon={<DeleteIcon />}
                                    isDisabled={user._id === userInfo._id}
                                    variant='outline'
                                    onClick={() => openDeleteConfirmBox(user)}>
                                        Remove User
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
        <ConfirmRemovalAlert 
            isOpen={isOpen} 
            onOpen={onOpen} 
            onClose={onClose} 
            cancelRef={cancelRef} 
            itemToDelete={userToDelete}
            deleteAction={deleteUser}
        />
    </Box>
  )}
</Box>
    );
};

export default OrdersTab;
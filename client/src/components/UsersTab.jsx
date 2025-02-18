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
import { getAllUsers, deleteUser, resetErrorAndRemoval } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const UsersTab = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [ userToDelete, setUserToDelete ] = useState('');
    const dispatch = useDispatch();
    const { error, loading, userRemoval, userList } = useSelector((state) => state.admin);
    const { userInfo } = useSelector((state) => state.user);
    const toast = useToast();

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(resetErrorAndRemoval());
        if(userRemoval) {
            toast({
                description: 'User has been removed.',
                status: 'success',
                isClosable: true,
            });
        }
    }, [dispatch, toast, userRemoval]);

    const openDeleteConfirmBox = (user) => {
        setUserToDelete(user);
        onOpen();
    };

  return <div>UsersTab</div>;
};

export default UsersTab;
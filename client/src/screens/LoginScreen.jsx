import { 
    Alert, 
    AlertDescription, 
    AlertIcon, 
    AlertTitle, 
    Box,
    Button,
    Container, 
    FormControl,
    HStack,
    Heading,
    Stack,
    Text,
    useToast

} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import PasswordField from '../components/PasswordField';
import PasswordForgottenForm from '../components/PasswordForgottenForm';
import TextField from '../components/TextField';

const LoginScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = '/products';
    const toast = useToast();

    const { loading, error, userInfo, message } = useSelector((state) => state.user);
    const [ showPasswordReset, setShowPasswordReset ] = useState(false);

    useEffect(() => {
        if(userInfo) {
            if(location.state?.from) {
                navigate(location.state.from)
            } else {
                navigate(redirect)
            }
            toast({
                description: 'Login successful',
                status: 'success',
                isClosable: true,
            });
        }

        if (message) {
        
            toast ({
                description: `${message}`,
                status: 'success',
                isClosable: true,
            });
        }
    }, [userInfo, redirect, error, navigate, location.state, toast, showPasswordReset, message]);

  return <div>LoginScreen</div>;
};

export default LoginScreen;
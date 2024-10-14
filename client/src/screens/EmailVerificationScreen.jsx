import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { verifyEmail } from '../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { 
    AbsoluteCenter, 
    Box, 
    Alert,
    AlertIcon, 
    AlertTitle, 
    AlertDescription,
    Text,
    Spinner,
    Button
} from '@chakra-ui/react'

const EmailVerificationScreen = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(verifyEmail(token));
    }, [token, dispatch]);

  return (
        <Box position='relative' minH='3xl'>
            <AbsoluteCenter axis='both'>
                {loading ? (
                    <Box textAlign='center'>
                        <Text fontSize='3xl'>We are working on verifying your email.</Text>
                        <Spinner size='xl' />
                    </Box>
                ) : error === null ? (
                    <Alert  
                        bg='parent' 
                        status='success' 
                        flexDirection='column' 
                        alignItems='center' 
                        justifyContent='center' 
                        textAlign='center'>

                            <AlertIcon boxSize='16' size='xl'/>
                            <AlertTitle>Thanks for verifying your email.</AlertTitle>
                            <AlertDescription fontSize='xl'>You can continue shopping now!</AlertDescription>
                    </Alert>
                ) : (
                    <Alert  
                        bg='parent' 
                        status='error' 
                        flexDirection='column' 
                        alignItems='center' 
                        justifyContent='center' 
                        textAlign='center'>

                            <AlertIcon boxSize='16' size='xl'/>
                            <AlertTitle>We are sorry!</AlertTitle>
                            <AlertDescription fontSize='xl'>You can continue shopping now!</AlertDescription>
                    </Alert>
                )}
                {!loading && (
                    <Link to='/login'>
                    <Button colorScheme='cyan' p='2' size='lg' minW='300px'>
                        Sign back in
                    </Button>
                    </Link>
                )}
            </AbsoluteCenter>
        </Box>
  );
};

export default EmailVerificationScreen;
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
    useToast,
    useBreakpointValue,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '../components/TextField';
import { login, googleLogin } from '../redux/actions/userActions';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

// import PasswordField from '../components/PasswordField';
import PasswordForgottenForm from '../components/PasswordForgottenForm';

const LoginScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = '/products';
    const toast = useToast();
    const dispatch = useDispatch();

    const { loading, error, userInfo, serverMsg } = useSelector((state) => state.user);
    const [ showPasswordReset, setShowPasswordReset ] = useState(false);

    const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
    const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

    const passwordReset = () => {
        setShowPasswordReset(!showPasswordReset);
    };

    useEffect(() => {
        if(userInfo) {
            if(location.state?.from) {
                navigate(location.state.from)
            } else {
                navigate(redirect);
            }
            toast({
                description: 'Login successful',
                status: 'success',
                isClosable: true,
            });
        }

        if (serverMsg) {
        
            toast ({
                description: `${serverMsg}`,
                status: 'success',
                isClosable: true,
            });
        }
    }, [userInfo, redirect, error, navigate, location.state, toast, showPasswordReset, serverMsg]);

    const handleGoogleLogin = useGoogleLogin({
      onSuccess: async (response) => {
        const userInfo = await axios.get('/https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        })
        .then((res) => res.data);
        const { sub, email, name, picture } = userInfo;
        dispatch(googleLogin(sub, email, name, picture));
      },
    });

    return (
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email.').required('An email address is required.'),
            password: Yup.string()
              .min(1, 'Password is too short - must contain at least 1 character.')
              .required('Password is required.'),
          })}
          onSubmit={(values) => {
            dispatch(login(values.email, values.password));
          }}>
          {(formik) => (
            <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
              <Stack spacing='8'>
                <Stack spacing='6'>
                  <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                    <Heading size={headingBR}>Log in to your account</Heading>
                    <HStack spacing='1' justify='center'>
                      <Text color='muted'>Don't have an account ?</Text>
                      <Link to='/registration'>
                      <Button variant='link' colorScheme='orange'>
                        Sign up
                      </Button>
                      </Link> 
                    </HStack>
                  </Stack>
                </Stack>
                <Box
                  py={{ base: '0', md: '8' }}
                  px={{ base: '4', md: '10' }}
                  bg={{ boxBR }}
                  boxShadow={{ base: 'none', md: 'xl' }}>
                  <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                    {error && (
                      <Alert
                        status='error'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'>
                        <AlertIcon />
                        <AlertTitle>We are sorry!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Stack spacing='5'>
                      <FormControl>
                        <TextField type='text' name='email' placeholder='you@example.com' label='Email' />
                        <TextField type='password' name='password' placeholder='your password' label='Password' />
                      </FormControl>
                    </Stack>
                    <Button onClick={passwordReset}>
                        {showPasswordReset ? 'Close' : 'Forgot Password?'}</Button>
                        {showPasswordReset && <div>
                            <PasswordForgottenForm />
                            </div>}
                    <Stack spacing='6'>
                      <Button colorScheme='cyan' size='lg' fontSize='md' isLoading={loading} type='submit'>
                        Sign in
                      </Button>
                      <Button 
                        leftIcon={<FcGoogle />}
                        colorScheme='cyan' 
                        size='lg' 
                        fontSize='md' 
                        isLoading={loading} 
                        onClick={() => handleGoogleLogin()}>
                        Google sign in
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Container>
          )}
        </Formik>
      );
};

export default LoginScreen;
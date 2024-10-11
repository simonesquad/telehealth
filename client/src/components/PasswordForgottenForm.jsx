import { Text, Stack, Box, Button, Input} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendResetEmail } from '../redux/actions/userActions';

const PasswordForgottenForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const handleChange = (event) => {
        setEmail(event.target.value);
    };

  return (
    <>
        <Box my='4'>
            <Text as='b'>Enter your email address below.</Text>
            <Text>We will send you an email with a link to reset your passsword.</Text>
        </Box>
        <Stack>
            <Input 
                mb='4' 
                type='text' 
                name='email' 
                placeholder='Your email address' label='email'
                value={email}
                onChange={(e) => handleChange(e)}
            />
            <Button colorScheme='yellow' size='lg' fontSize='md' onClick={() => dispatch(sendResetEmail(email))}>Send Reset Email</Button>
        </Stack>
    </>
  )
};

export default PasswordForgottenForm;
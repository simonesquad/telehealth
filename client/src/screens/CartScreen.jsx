import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    useColorModeValue as mode,
    Spinner,
    Alert,
    AlertIcon,
    AlertDescription,
    Wrap,
    AlertTitle,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

const CartScreen = () => {
    const { loading, error, cartItems } = useSelector((state) => state.cart);

    const getHeadingContent = () => (cartItems.length === 1 ? '(1 Item)' : `(${cartItems.length} Items)`);

    return (
        <Wrap spacing='30px' justify='center' minHeight='100vh'>
            {loading ? (
                <Stack direction='row' spacing='4'> <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' /></Stack> 
            ) : error ? (
                <Alert status='error'>
                <AlertIcon />
                <AlertTitle>We are sorry!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : cartItems.length <= 0 ? (
                <Alert status='warning'>
                <AlertIcon />
                <AlertTitle>Your cart is empty.</AlertTitle>
                <AlertDescription>
                    <Link as={ReactLink} to='/products'>
                        Click here to see your products.
                    </Link>
                </AlertDescription>
              </Alert>
            ) : (
                <p>display cart</p>
            )}
        </Wrap>
    );
};

export default CartScreen;
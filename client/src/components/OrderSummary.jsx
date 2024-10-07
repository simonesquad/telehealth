import  {  
  Button, 
  Flex, 
  Heading, 
  Stack, 
  Text, 
  useColorModeValue as mode 
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import cart, { cartSelector } from '../redux/slices/cart';

const OrderSummary = () => {

  const { subtotal, shipping } = useSelector((state) => state.cart);

  return (
    <Stack 
      minWidth='300px' 
      spacing='8' 
      borderWidth='1px' 
      borderColor={mode('cyan.500', 'cyan.100')} 
      rounded='lg' 
      padding='8'
      w='full'
      >
        <Heading size='md'>Order Summary</Heading>
        <Stack spacing='6'>

            <Flex justify='space-between'>
            <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>Subtotal</Text>
            <Text fontWeight='medium'>${subtotal}</Text>
            </Flex>

            <Flex justify='space-between'>
            <Text fontSize='medium' color={mode('gray.600', 'gray.400')}>Shipping</Text>
            <Text fontWeight='medium'>${shipping}</Text>
            </Flex>

            <Flex justify='space-between'>
            <Text fontSize='xl' fontWeight='extrabold'>Total</Text>
            <Text fontWeight='medium'>${Number(subtotal) + Number(shipping)}</Text>
            
          </Flex>
        </Stack>

        <Link to='/checkout'>
          <Button 
            colorScheme='cyan' 
            size='lg' 
            rightIcon={<FaArrowRight />}
            >
            Checkout
          </Button>
        </Link>

      </Stack>
  );
};

export default OrderSummary;
import { MinusIcon, SmallAddIcon } from '@chakra-ui/icons';
import { 
  Alert, 
  AlertDescription, 
  AlertIcon, 
  AlertTitle, 
  Badge, 
  Box, 
  Button, 
  Flex, 
  HStack, 
  Heading, 
  Image, 
  SimpleGrid, 
  Spinner, 
  Stack, 
  Text, 
  Wrap } 
  from '@chakra-ui/react';
import { BiCheckShield, BiPackage, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/productActions';
import { useEffect, useState } from 'react';
import Star from '../components/Star';

const ProductScreen = () => {
  const [amount, setAmount] = useState(1);
  const {id} = useParams()
  const dispatch = useDispatch()
  const {loading, error, product} = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);


  const changeAmount = (input) => {
    if (input === 'plus') {
      setAmount(amount + 1);
    }
    if (input === 'minus') {
      setAmount(amount - 1);
    }
  };

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
    {loading ? (
      <Stack direction='row' spacing='4'>
        <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
      </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box 
            maxW={{base: '3xl', lg: '5xl'}} 
            mx='auto' 
            px={{base: '4', md: '6', lg: '12'}} 
            py={{base: '4', md: '6', lg: '12'}}>
              <Stack direction={{base: 'column', lg: 'row' }} align='flex-start'>
                {product.productIsNew && (
                  <Badge p='2' rounded='md' w='50px' fontSize='0.8em' colorScheme='green'>New</Badge>
                )}
                {product.stock === 0 && (
                  <Badge rounded='full' w='70px' fontSize='0.8em' colorScheme='red'>
                    sold out
                  </Badge>
                )}
                <Heading fontSize='2xl'fontWeight='extrabold'>       
                {product.brand} {product.name}
                </Heading>
              </Stack>
            </Box>
        )
      )}
  </Wrap>
  );
};


export default ProductScreen;
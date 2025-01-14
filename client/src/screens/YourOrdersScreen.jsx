import { 
  TableContainer, 
  Stack, 
  Spinner, 
  Alert, 
  AlertIcon, 
  AlertDescription, 
  Th, 
  Tbody, 
  Tr, 
  Thead, 
  Button, 
  ListItem, 
  UnorderedList, 
  Table, 
  Id, 
  AlertTitle, 
  Wrap, 
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const YourOrdersScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, orders, userInfo } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    if(userInfo) {
      dispatch(getUserOrders());
    }
  }, [dispatch, userInfo]);

    return (
      <>
        {loading ? (
          <Wrap direction='column' align='center' mt='20px' justify='center' minHeight='100vh'>
                <Stack direction='row' spacing='4'> 
                    <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
                </Stack> 
          </Wrap>
        ) : error ? (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          orders && <TableContainer minH='100vh'>
            <Table variant='striped'>
              <Thead>
                <Tr>
                  <Th>Order Id</Th>
                  <Th>Order Id</Th>
                  <Th>Order Id</Th>
                  <Th>Order Id</Th>
                  <Th>Order Id</Th>
                </Tr>
              </Thead>
            </Table>
          </TableContainer>
        )}
      </>
    );
};

export default YourOrdersScreen;
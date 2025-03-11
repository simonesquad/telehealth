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
    useToast,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Flex,
    Text,

} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, resetErrorAndRemoval } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';
import { getProducts } from '../redux/actions/productActions';
import { removeReview } from '../redux/actions/adminActions';

const ReviewsTab = () => {
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.admin);
    const { products, reviewRemoval } = useSelector((state) => state.products);
    const toast = useToast();

    useEffect(() => {
        dispatch(getProducts());
        if(reviewRemoval) {
            toast({
                description: 'User has been removed.',
                status: 'success',
                isClosable: true,
            });
        }
    }, [dispatch, toast, reviewRemoval, loading]);

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
                {products.length > 0 && 
                    products.map((product) => ( 
                        <Box key={product._id}>
                            <Accordion allowToggle>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex='1'>
                                                <Flex>
                                                    <Text mr='8px' fontWeight='bold'>
                                                    {product.name}
                                                    </Text>
                                                    <Spacer />
                                                    <Text mr='8px' fontWeight='bold'>({product.reviews.length} Reviews)</Text>
                                                </Flex>
                                            </Box>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb='4'>
                                        <TableContainer>
                                            <Table size='sm'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Username</Th>
                                                        <Th>Rating</Th>
                                                        <Th>Title</Th>
                                                        <Th>Comment</Th>
                                                        <Th>Created</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {product.reviews.map((review) => (
                                                        <Tr key={review._id}>
                                                            <Td>{review.name}</Td>
                                                            <Td>{review.name}</Td>
                                                            <Td>{review.name}</Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ReviewsTab;
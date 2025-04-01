import { 
    Accordion, 
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Spinner,
    Stack,
    StatLabel,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    Wrap,
    useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, resetProductError } from '../redux/actions/productActions';

const ProductsTab = () => {
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.admin);
    const { products, prooductUpdate } = useSelector((state) => state.product);
    const toast = useToast();


  return (
    <div>ProductsTab</div>
  );
};

export default ProductsTab;
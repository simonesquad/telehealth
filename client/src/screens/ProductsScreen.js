import { Box } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';

const ProductsScreen = () => {
    return (
        <Box>
            <ProductCard product={{name: 'smartphone'}} loading={false} />
        </Box>
    )
};

export default ProductsScreen;

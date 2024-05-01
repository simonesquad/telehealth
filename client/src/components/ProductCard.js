import { Box, Image, Text, Badge, Flex, IconButton, Skeleton } from '@chakra-ui/react';
import { BiExpand } from 'react-icons/bi';
import React from 'react';

const ProductCard = ({ product, loading }) => {
  return <Skeleton isLoaded={!loading} _hover={{ size: 1.5 }}>
    <Box
        _hover={{transform: 'scale(1.1)', transitionDuration: '0.5s'}}
        borderWidth='1px'
        overflow='hidden'
        p='4'
        shadow='md'>
        <Image />
        {product.stock < 5 ? (
            <Badge colorScheme='yellow'>only {product.stock} left</Badge>
        ) : product.stock < 1 ? (
            <Badge colorScheme='red'>Sold out</Badge>
        ) : <Badge colorScheme='green'>In Stock</Badge>}
    </Box>
  </Skeleton>;
};

export default ProductCard;
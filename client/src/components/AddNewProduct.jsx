import {
    Tr,
    Td,
    Button,
    VStack,
    Textarea,
    Tooltip,
    Input,
    FormControl,
    Switch,
    FormLabel,
    Text,
    Badge,
    Spacer,
} from '@chakra-ui/react';

import { useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { uploadProduct } from '../redux/actions/adminActions';

const AddNewProduct = () => {
    const dispatch = useDispatch();
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [productIsNew, setProductIsNew] = useState('');
    const [description, setDescription] = useState('');
    const [imageOne, setImageOne] = useState('');
    const [imageTwo, setImageTwo] = useState('');

    const createNewProduct = () => {
        dispatch(
            uploadProduct({
                brand,
                name,
                category,
                stock,
                price,
                image: [`/images/${imageOne}`, `/images/${imageTwo}`],
                productIsNew,
                description,
            })
        );
    };


    return (
        <Tr>
            <Td>
                <Text fontSize='sm'>Image File Name 1</Text>
                <Tooltip label={'Set the name of your first image e.g., iPhone.jpg'}
                fontSize='sm'>
                    <Input size='sm' value={imageOne} onChange={(e) => setImageOne(e.target.value)} />
                </Tooltip>
                <Spacer />
                <Text fontSize='sm'>Image File Name 2</Text>
                <Tooltip label={'Set the name of your second image e.g., iPhone.jpg'} fontSize='sm'>
                    <Input size='sm' value={imageTwo} onChange={(e) => setImageTwo(e.target.value)} />
                </Tooltip>
            </Td>
        </Tr>
    )

};

export default AddNewProduct;
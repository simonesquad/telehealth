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


    return <div>AddNewProduct</div>;

};

export default AddNewProduct;
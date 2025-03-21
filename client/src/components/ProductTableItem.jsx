import { DeleteIcon } from '@chakra-ui/icons';
import {
    Badge,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Id,
    Textarea,
    Tr,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import { 
    useRef, 
    useState
} from 'react'
import { MdOutlineDataSaverOn } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { deleteProduct, updateProduct } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const ProductTableItem = ({product}) => {
    const cancelRef = useRef()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [brand, setBrand] = useState(product.brand)
    const [category, setCategory] = useState(product.category)
    const [stock, setStock] = useState(product.stock)
    const [price, setPrice] = useState(product.price)
    const [productIsNew, setProductIsNew] = useState(product.productIsNew)
    const [description, setDescription] = useState(product.description)
    const dispatch = useDispatch()

    const onSaveProduct = () => {
        dispatch(updateProduct(
            brand, 
            name, 
            category, 
            stock, 
            price, 
            product._id, 
            productIsNew,
            description
        ))
    }

    const openDeleteConfirmBox = () => {
        onOpen()
    }

    return(
        <>
            <Tr>
                <Td>
                    <Textarea w='270px' h='120px' value={description} onChange={} />
                </Td>
            </Tr>
        </>
    )

}

export default ProductTableItem
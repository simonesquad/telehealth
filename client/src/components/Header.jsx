import React from 'react';
import { 
    IconButton, 
    Box, 
    Flex, 
    HStack, 
    Icon, 
    Stack, 
    Text, 
    useColorModeValue as mode, 
    useDisclosure,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Divider,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
    useToast, 
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsPhoneFlip } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MdOutlineFavorite, MdOutlineFavoriteBorder, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NavLink from './NavLink';
import ColorModeToggle from './ColorModeToggle';
import { BiUserCheck, BiLogInCircle } from 'react-icons/bi';
import { toggleFavorites } from '../redux/actions/productActions';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { TbShoppingCart } from 'react-icons/tb';
import { logout } from '../redux/actions/userActions';



const Links = [
    {name: 'Products', route: '/products'},
    {name: 'Hot Deals', route: '/hot-deals'},
    {name: 'Contact', route: '/contact'},
    {name: 'Services', route: '/services'}
];

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch()
    const { favoritesToggled } = useSelector((state) => state.product);
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.user);
    const toast = useToast();

    useEffect(() => {}, [favoritesToggled, dispatch]);

    const logoutHandler = () => {
        dispatch(logout());
        toast({
            description: 'You have been logged out.',
            status: 'success',
            isClosable: 'true',
        });
    };

    return (
        
        <Box bg={mode(`cyan.300`, 'gray.900')} px='4'>

            <Flex h='16' alignItems='center' justifyContent='space-between'>
                <Flex display={{base: 'flex', md: 'none'}} alignItems='center'>
                    <IconButton 
                        bg='parent' 
                        size='md' 
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} 
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <Link to='/cart'>
                        <IconButton 
                            ml='12' 
                            position='absolute' 
                            icon={<TbShoppingCart size='20px' />}
                            to='/cart'
                            variant='ghost'
                        />
                    </Link>
                    {cartItems.length > 0 && (
                        <Text 
                            fontWeight='bold' fontStyle='italic' position='absolute'
                            ml='74px'
                            mt='-6'
                            fontSize='sm'
                        >{cartItems.length}</Text>
                    )}
                </Flex>
                <HStack spacing='8' alignItems='center'>
                    <Link to='/'>
                        <Box 
                            alignItems='center' display='flex' 
                            >
                            <Icon as={BsPhoneFlip} h='6' w='6' color={mode('black', 'yellow.200')} />
                            <Text as ='b'>Telehealth</Text>
                        </Box>
                    </Link>

                    <HStack as='nav' spacing='4' display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link) => (
                            <NavLink route={link.route} key={link.route}><Text fontWeight='medium'>{link.name}</Text></NavLink>
                        ))}

                        <Box>
                            <Link to='/cart'>
                                <IconButton 
                                    ml='12' 
                                    position='absolute' 
                                    icon={<TbShoppingCart size='20px' />}
                                    variant='ghost'
                                />
                            </Link>
                            {cartItems.length > 0 && (
                            <Text 
                                fontWeight='bold' fontStyle='italic' position='absolute'
                                ml='26px'
                                mt='-6'
                                fontSize='sm'
                                >{cartItems.length}
                            </Text>
                            )}
                        </Box>

                        <ColorModeToggle />
            
        {favoritesToggled ? (
            <IconButton 
                onClick={() => dispatch(toggleFavorites(false))}
                icon={ <MdOutlineFavorite size='20px' />}
                variant='ghost'
            />
        ) : (
            <IconButton 
                onClick={() => dispatch(toggleFavorites(true))}
                icon={ <MdOutlineFavorite size='20px' />}
                variant='ghost'
            />
        )}
            </HStack>
        </HStack>
        <Flex alignItems='center'>
            {userInfo ? (
                <Menu>
                    <MenuButton rounded='full' variant='link' cursor='pointer' minW='0'>
                        <HStack>
                            <BiUserCheck size='30' />
                            {/* <ChevronDownIcon /> */}
                        </HStack>
                    </MenuButton>
                    <MenuList>
                        <HStack>
                            <Text pl='3' as='i'>{userInfo.email}</Text>
                        </HStack>
                        <Divider py='1' />
                        <Link to='/order-history'>
                            <MenuItem>
                            Order History
                            </MenuItem>
                            {userInfo.isAdmin && (
                                <>
                                <MenuDivider />
                                <Link to='/admin-console'>
                                <MenuItem>
                                    Admin Console
                                </MenuItem>
                        </Link>
                                </>
                            )}
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </Link>
                        <Link to='/profile'>
                            <MenuItem>
                            Profile
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            ): (
            <Menu>
                <MenuButton as={IconButton} variant='ghost' cursor='pointer' icon={<BiLogInCircle size='25px' />} />
                <MenuList>
                    <Link to='/login'>
                        <MenuItem p='2' fontWeight='400' variant='link'>Sign In</MenuItem>
                    </Link>
                    <MenuDivider />
                    <Link to='/registration'>
                        <MenuItem p='2' fontWeight='400' variant='link'>Sign Up</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
            )}
        </Flex>
    </Flex>
    <Box display='flex'>
                    {isOpen && (
                        <Box pb='4' display={{md: 'none'}}>
                            <Stack as='nav' spacing='4'> {Links.map((link) => (
                                <NavLink route={link.route} key={link.route}><Text fontWeight='medium'>{link.name}</Text></NavLink>
                            ))}
                            </Stack>
                            {favoritesToggled ? (
                                <IconButton 
                                    onClick={() => dispatch(toggleFavorites(false))}
                                    icon={ <MdOutlineFavorite size='20px' />}
                                    variant='ghost'
                                />
                            ) : (
                                <IconButton 
                                    onClick={() => dispatch(toggleFavorites(true))}
                                    icon={ <MdOutlineFavorite size='20px' />}
                                    variant='ghost'
                                />
                            )}
                            <ColorModeToggle />
                        </Box>
                    )}
                </Box>
            </Box>
        );
    };

export default Header;
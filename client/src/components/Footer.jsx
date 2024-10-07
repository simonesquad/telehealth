import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue as mode,
  Box,
  Flex,
  Icon
} from '@chakra-ui/react';
import { FaGithub, FaLinkedIn, FaFacebook } from 'react-icons/fa';
import { BsPhoneFlip } from 'react-icons/bs';

const Footer = () => (
  <Box w='100%' bg={mode('cyan.300', 'gray.900')}>
    <Container as='footer' maxW='7xl'>
    <Stack spacing='8' direction={{ base: 'column', md: 'row' }} justify='space-between' py={{base: '12', md: '16'}}>
    <Stack spacing={{base: '6', md: '8'}} align='start'>
      <Flex alignItems='center'>
        <Icon as={<BsPhoneFlip />} h='10' w='10' color={mode('black', 'yellow.200')} />
        <Text fontSize='2xl' fontWeight='extrabold'>
          Telehealth
        </Text>
      </Flex>
      <Text color='muted'>We love phones.</Text>
    </Stack>
    <Stack direction={{base: 'column-reverse', md: 'column', lg: 'row'}} spacing={{base: '12', md: '8'}}>
      <Stack direction='row' spacing='8'>
        <Stack spacing='4' minW='36' flex='1'>
          <Text fontSize='sm' fontWeight='semibold' color='subtle'>
            Legal
          </Text>
          <Stack spacing='3' shouldWrapChildren>
            <Button variant='link'>Privaccy</Button>
            <Button variant='link'>Terms</Button>
            <Button variant='link'>License</Button>
          </Stack>
        </Stack>

        <Stack spacing='4'>
          <Text fontSize='sm' fontWeight='semibold' color='subtle'>
            Stay up to date**
          </Text>
          <Stack spacing='4'></Stack>
        </Stack>
      </Stack>
    </Stack>
    </Stack>
    </Container>
  </Box>
);

export default Footer;
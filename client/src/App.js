import { ChakraProvider } from '@chakra-ui/react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Header from './components/Header';
// screens //
import LandingScreen from './screens/LandingScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';

function App() {
  return (
      <ChakraProvider>
          <Router>
              <Header />
              <main>
                <Routes>
                  <Route path='/products' element={<ProductsScreen />} />
                  <Route path='/' element={<LandingScreen />} />
                  <Route path='/product/:id' element={<ProductScreen />} />
                  <Route path='/cart' element={<CartScreen />} />
                  <Route path='/login' element={<LoginScreen />} />
                  <Route path='/registration' element={<RegistrationScreen />} />
                  <Route path='/email-verify/:token' element={<EmailVerificationScreen />} />
                  <Route path='/password-reset/:token' element={<PasswordResetScreen />} />
                </Routes>
              </main>
              <Footer />
          </Router>
      </ChakraProvider>
    );
}

export default App;

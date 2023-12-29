import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './screens/Home.js';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './screens/Cart';
import Orders from './screens/Orders'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { CartProvider } from './components/ContextReducer';


function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createUser" element={<Signup />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;

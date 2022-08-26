import Signup from './Signup.js';
import Listings from './Listings.js';
import {Routes, BrowserRouter, Route, Navigate} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/listings" element={<Listings />} />
     </Routes>
    </BrowserRouter>  
  );
}

export default App;

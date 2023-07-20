import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Listing from './Listing';
import Create from './Create';
import Detail from './Detail';
import Edit from './Edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Listing />}></Route>
          <Route path='/produit/create' element={<Create />}></Route>

          <Route path='/produit/detail/:pid' element={<Detail />}></Route>
          <Route path='/produit/edit/:pid' element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;

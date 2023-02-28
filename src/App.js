
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import AddEdit from './Pages/AddEdit';
import UpdateCrud from './Pages/upDate';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addContact" element={<AddEdit/>}/>
        <Route path="/update/:RollNo" element={<UpdateCrud/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

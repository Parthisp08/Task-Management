
import './App.css';
import AddTask from './Pages/AddTask';
import  List  from './Pages/List';
import Update from './Pages/Update';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import {useSelector} from 'react-redux'

function App() {

  // const taskList = useSelector((state))
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
       
       <Route path='/' element={<List/>}/>
       <Route path='/list' element={<List/>}/>
       <Route path='/add' element={<AddTask/>}/>
        <Route path='/update/:id' element={<Update/>}/>
      

     </Routes>
     
     </BrowserRouter>
     <ToastContainer>

     </ToastContainer>
    
    </div>
  );
}

export default App;

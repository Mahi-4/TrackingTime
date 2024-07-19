import './App.css';
import Login from './component/login.js';
import Register from './component/register.js';
import { BrowserRouter , Route, Switch, Routes } from 'react-router-dom';
import MainApp from './component/main.js';
import LoginSuccess from './component/loginSuccess.js';
import Onboard1 from './component/onboarding/onboard1.js';
import Onboard2 from './component/onboarding/onboard2.js';
import Onboard3 from './component/onboarding/onboard3.js';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Onboard1/>}></Route>
        <Route path='/onboard2' element={<Onboard2/>}></Route>
        <Route path='/onboard3' element={<Onboard3/>}></Route>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/register' element={<Register/>}/>
        <Route path='/main' element={<MainApp/>}></Route>
        <Route path='/loginSuccess' element={<LoginSuccess/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;

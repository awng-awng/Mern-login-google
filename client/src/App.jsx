import './App.css';
import Home from './components/Home';
import Headers from './components/Headers';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;

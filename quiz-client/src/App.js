import './App.css';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Login from './components/login';
import Layout from './components/Layout';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path ='/' element={<Layout />}>
          <Route path='/quiz' element={<Quiz />}/>
          <Route path='/result' element={<Result />}/>
        </Route>
      </Routes>
     </BrowserRouter>
  );
}

export default App;

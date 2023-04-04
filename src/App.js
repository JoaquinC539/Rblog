import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Missing from './Missing';
import About from './About';
import {Route,Routes,useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';

function App() {
  return (
  
  <Routes> 
    <Route path='/' element={<Layout />} >   
    <Route index element={<Home />} /> 
    <Route path='post'>
      <Route index element={<NewPost />} />
      <Route path=':id' element={<PostPage />} />
    </Route>
    <Route path="about" element={<About />} />
    <Route path="*" element={<Missing />} />
    
    </Route>
  </Routes>  
     
  
    
  );
}

export default App;

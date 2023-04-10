import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Missing from './Missing';
import About from './About';
import EditPost from './EditPost';
import {Route,Routes,useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
function App() {
  const [posts, setPosts]=useState([]);
const [search,setSearch]=useState("");
const [searchResults,setSearchResults]=useState([]);
const [postTitle,setPostTitle]=useState('');
const [postBody,setPostBody]=useState('');
const navigate=useNavigate();
const [editTitle,setEditTitle]=useState('');
const [editBody,setEditBody]=useState('');
useEffect(()=>{
  const fetchPosts=async ()=>{
    try{
      const response=await api.get('/posts');
      if (response && response.data) setPosts(response.data);
    }catch(err){
      if(err.response){
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers); 
      }else{
        console.log(`Error: ${err.message}`); 
      }
    }
  }
  fetchPosts();
  
},[])

const handleSubmit=async (e)=>{
  e.preventDefault();
  const id=posts.length?posts[posts.length-1].id+1:1;
  const datetime=format(new Date(), 'MMMM dd, yyyy pp');
  const newPost={id:id, title:postTitle,datetime:datetime,body:postBody};
  try{
  const response =await api.post('/posts',newPost);    
  const allPost=[...posts,response.data];
  setPosts(allPost);
  setPostTitle("");
  setPostBody("");
  navigate('/'); 
  }catch(err){
    if(err.response){
      console.log(`Error: ${err}`);
    }
  }
}
const handleDelete= async (id)=>{
  try{
    await api.delete('/posts/'+id)
  const postList=posts.filter(post=>post.id!==id);
  setPosts(postList);
  navigate('/');
  }catch(err){
    console.log(`Error: ${err.message}`); 
  }
}
useEffect(()=>{
const filteredResults=posts.filter(post=>((post.body).toLowerCase()).includes(search.toLowerCase())
|| ((post.title).toLowerCase()).includes(search.toLowerCase()));
setSearchResults(filteredResults.reverse());
},[posts,search])

const handleEdit=async (id)=>{
  const datetime=format(new Date(), 'MMMM dd, yyyy pp');
  const updatedPost={id:id, title:editTitle,datetime:datetime,body:editBody};
  try{
    const response=await api.put('/posts/'+id,updatedPost);
    setPosts(posts.map(post=>post.id===id?{...response.data}:post));
    setEditTitle('');
    setEditBody('');
    navigate('/');
  }catch(err){
    console.log(err)
  }
}
  return (  
  <Routes> 
    <Route path='/' element={<Layout search={search} setSearch={setSearch}/>} >   
    <Route index element={<Home posts={searchResults}/>} /> 
    <Route path='post'>
      <Route index element={<NewPost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} />} />
      <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
    </Route>
    <Route path='edit'>
      <Route path=':id'element={<EditPost posts={posts} handleEdit={handleEdit} editTitle={editTitle} setEditTitle={setEditTitle} editBody={editBody} setEditBody={setEditBody}/>}></Route>
    </Route>
    <Route path="about" element={<About />} />
    <Route path="*" element={<Missing />} />
    
    </Route>
  </Routes>  

  
    
  );
}

export default App;

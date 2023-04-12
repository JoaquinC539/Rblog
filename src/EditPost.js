import { useEffect,useContext,useState } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import DataContext from "./context/DataContext";
import format from "date-fns/format";
import api from './api/posts';
const EditPost = () => {

  const navigate=useNavigate();
  const [editTitle,setEditTitle]=useState('');
  const [editBody,setEditBody]=useState('');
    const {posts,setPosts}=useContext(DataContext)
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id);
    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body)
        }
    },[post,setEditTitle,setEditBody])

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
    <main className="NewPost">
        {editTitle &&
      <>
        <h2>Edit Post</h2>
        <form className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="postTile">Title:</label>
            <input id="postTitle" type="text" required value={editTitle} onChange={(e)=>setEditTitle(e.target.value)}/>
            <label htmlFor="postBody">Post:</label>
            <textarea required id="postBody"  value={editBody} onChange={(e)=>setEditBody(e.target.value)}></textarea>
            <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>
        </form>
        </>
        }
    {!editTitle &&
    <>
        <h2>Post Not Found</h2>
        <p>Well, that's dissappointing</p>
        <p><Link to='/'>Visit our HomePage</Link></p>
    </>
    }
    </main>
  )
}

export default EditPost
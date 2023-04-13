import { useEffect } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import format from "date-fns/format";
import { useStoreActions,useStoreState } from "easy-peasy";
const EditPost = () => {

  const navigate=useNavigate();

  const {id}=useParams();

  const getPostById=useStoreState((state)=>state.getPostById)
  const post=getPostById(id)
  const editTitle=useStoreState((state)=>state.editTitle);
  const editBody=useStoreState((state)=>state.editBody);

  const editPost=useStoreActions((actions)=>actions.editPost);
  const setEditTitle=useStoreActions((actions)=>actions.setEditTitle);
  const setEditBody=useStoreActions((actions)=>actions.setEditBody);

  useEffect(()=>{
    if(post){
        setEditTitle(post.title);
        setEditBody(post.body)
    }
},[post,setEditTitle,setEditBody])
    const handleEdit= (id)=>{
      const datetime=format(new Date(), 'MMMM dd, yyyy pp');
      const updatedPost={id:id, title:editTitle,datetime:datetime,body:editBody};
      editPost(updatedPost)
      navigate('/post/'+id);
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
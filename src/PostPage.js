import { useParams,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStoreActions,useStoreState } from "easy-peasy";
const PostPage = () => {

  const navigate=useNavigate();
  const {id}=useParams();
  const deletePost=useStoreActions((actions)=>actions.deletePost)
  const getPostById=useStoreState((state)=>state.getPostById)
  const post=getPostById(id);
  
  const handleDelete=  (id)=>{
    deletePost(id);
    navigate('/');
  } 

      return (
      <main className="PostPage">
        <article className="post">
          {post && 
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={'/edit/'+post.id}><button className="editButton">Edit Post</button></Link>
            <button className="deleteButton" onClick={()=>handleDelete(post.id)}>Delete Post</button>
          </>
          }
          {!post &&
            <>
              <h2>Post not found</h2>
              <p>Well, that's dissapointing</p>
              <p>
                <Link to="/">Visit our Homepage</Link>
              </p>
            </>
          }
        </article>
      </main>
    )
  }
  
  export default PostPage
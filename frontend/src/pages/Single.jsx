
import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "../axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        console.log(res);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single" style={{margin:"40px 40px"}}>
      <div className="content">
        <img src={post.img} alt="" />
        <div className="user" style={{display:"flex",justifyContent:"space-between"}}>
          {post.userImg && <img
            src={post.userImg}
            alt=""
          />}

          <div className="blog-container">
          <div className="blog-header">
            <div className="info">
              <p><strong>Created By:</strong> {post.username}</p>
              <p><strong>Posted:</strong> {moment(post.date).fromNow()}</p>
            </div>

            {currentUser?.username === post.username && (
              <div className="edit">
                <Link to={`/write?edit=2`} state={post} title="Edit Post">
                  <img src={Edit} alt="Edit" className="edit-icon" />
                </Link>
                <img onClick={handleDelete} src={Delete} alt="Delete" title="Delete Post" className="delete-icon" />
              </div>
            )}
          </div>

          <h1 className="post-title">📝 {post.title}</h1>
          <h4 className="post-category"><i>📂 Category:</i> {post.cat}</h4>

          <div
            className="post-description"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.description),
            }}
          >
          </div>
        </div>
        </div>
        </div>
      <Menu cat={post.cat}/>
    </div>
  );
};

export default Single;

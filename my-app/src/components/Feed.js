import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import LikeButton from './LikeButton'; // Import the new component

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", postId));
        alert("Post deleted successfully!");
      } catch (error) {
        console.error("Error removing document: ", error);
        alert("Error deleting post.");
      }
    }
  };

  return (
    <div>
      <h2>Feed</h2>
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p><strong>{post.authorEmail}</strong></p>
              {auth.currentUser && auth.currentUser.email === post.authorEmail && (
                <button 
                  onClick={() => handleDeletePost(post.id)} 
                  style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Delete
                </button>
              )}
            </div>
            <p>{post.text}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small>
                {post.createdAt ? new Date(post.createdAt.toDate()).toLocaleString() : 'Just now'}
              </small>
              <LikeButton postId={post.id} /> {/* <-- Add the LikeButton here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
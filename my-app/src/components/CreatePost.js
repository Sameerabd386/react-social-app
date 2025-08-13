import React, { useState } from 'react';
import { db, auth } from '../firebase'; // Import db and auth
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 

function CreatePost() {
  const [postText, setPostText] = useState('');

  const handleCreatePost = async () => {
    if (postText.trim() === '') {
      alert("Please write something to post!");
      return;
    }

    try {
      // 'posts' is the name of our collection in Firestore
      await addDoc(collection(db, "posts"), {
        text: postText,
        authorEmail: auth.currentUser.email, // Save the user's email
        createdAt: serverTimestamp() // Add a timestamp
      });
      setPostText(''); // Clear the input box after posting
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error creating post.");
    }
  };

  return (
    <div>
      <h3>Create a New Post</h3>
      <textarea 
        rows="3"
        placeholder="What's on your mind?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <br />
      <button onClick={handleCreatePost}>Post</button>
    </div>
  );
}

export default CreatePost;
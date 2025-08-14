import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, doc, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";

function LikeButton({ postId }) {
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!postId) return;
    
    // Path to the 'likes' subcollection for this specific post
    const likesCollectionRef = collection(db, "posts", postId, "likes");

    const unsubscribe = onSnapshot(likesCollectionRef, (snapshot) => {
      const likesData = snapshot.docs.map(doc => doc.id);
      setLikes(likesData);
      
      // Check if the current user has already liked this post
      if (currentUser) {
        setIsLiked(likesData.includes(currentUser.uid));
      }
    });

    return () => unsubscribe();
  }, [postId, currentUser]);

  const handleLike = async () => {
    if (!currentUser) {
      alert("You must be logged in to like a post.");
      return;
    }

    const likeDocRef = doc(db, "posts", postId, "likes", currentUser.uid);

    if (isLiked) {
      // If already liked, unlike it (delete the document)
      await deleteDoc(likeDocRef);
    } else {
      // If not liked, like it (create the document)
      await setDoc(likeDocRef, {}); // We just need the doc to exist, no data needed
    }
  };

  return (
    <div>
      <button onClick={handleLike}>
        {isLiked ? 'Unlike' : 'Like'}
      </button>
      <span> {likes.length} Likes</span>
    </div>
  );
}

export default LikeButton;
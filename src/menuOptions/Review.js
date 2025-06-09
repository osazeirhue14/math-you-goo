import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';  
import FooterM from './FooterM';
import logo from '../MATH-YOO-GOO.png';  
import { db } from "./Firebase";  
import { collection, addDoc } from "firebase/firestore"; 

function Review() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "reviews"), {
        userName,
        rating: parseInt(rating),
        comment,
        date: new Date()
      });
      console.log("Review added!");
      setUserName("");
      setRating(0);
      setComment("");
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  return (
    <>
      {/* Logo in the Top-Left Corner */}
      <img 
        src={logo} 
        alt="Math Yoo Goo Logo"
        style={{
          position: 'absolute',
          top: '110px',
          left: '40px',
          width: '120px',
          height: '120px',
          zIndex: 1100
        }} 
      />

      {/* Navigation Bar */}
      <Navbar options={['Home', 'Account', 'Differential Calculus', 'Linear Algebra', 'Contact', 'Review', 'Help', 'Logout']} />

      {/* Title Section */}
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Math-You-Goo!</h1>
        <p>
          Welcome to Math-you-goo’s review page! Let us know what you think about the platform and how we can improve.
        </p>
      </div>

      {/* Review Form */}
      <div style={{ 
        maxWidth: '600px', 
        margin: '40px auto', 
        padding: '35px', 
        border: '2px solid black', 
        borderRadius: '10px', 
        backgroundColor: '#f4f4f4' 
      }}>
        <h3 style={{ textAlign: 'center' }}>Leave a Review</h3>
        <form onSubmit={handleSubmitReview}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="userName" style={{ display: 'block', fontSize: '18px', marginBottom: '5px' }}>Name:</label>
            <input 
              type="text" 
              id="userName" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              required 
              style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', margin: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="rating" style={{ display: 'block', fontSize: '18px', marginBottom: '5px' }}>Rating (1-5):</label>
            <input 
              type="number" 
              id="rating" 
              value={rating} 
              onChange={(e) => setRating(e.target.value)} 
              min="1" 
              max="5" 
              required 
              style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', margin: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="comment" style={{ display: 'block', fontSize: '18px', marginBottom: '5px' }}>Comment:</label>
            <textarea 
              id="comment" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              required 
              style={{ width: 'calc(100% - 10px)', height: '100px', padding: '8px', fontSize: '16px', margin: '5px' }}
            />
          </div>
          <button type="submit" style={{ 
            width: '100%', 
            padding: '10px', 
            fontSize: '18px', 
            backgroundColor: '#007BFF', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}>
            Submit Review
          </button>
        </form>
      </div>

      {/* Footer */}
      <FooterM />
    </>
  );
}

export default Review;

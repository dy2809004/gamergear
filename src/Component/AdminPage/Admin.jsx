// src/components/Admin/Admin.jsx
import React, { useState } from "react";
import './Admin.css';
import { db } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    real_price: '',
    discount_price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Products"), formData);
      console.log("Document written with ID: ", docRef.id);
      // Reset form
      setFormData({
        name: '',
        category: '',
        real_price: '',
        discount_price: ''
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="Admin">
        <form onSubmit={handleSubmit}>
            <label>name: <input type="text" name="name" value={formData.name} onChange={handleChange} /> </label><br />
            <label>category: <input type="text" name="category" value={formData.category} onChange={handleChange} /> </label><br />
            <label>real_price: <input type="text" name="real_price" value={formData.real_price} onChange={handleChange} /> </label><br />
            <label>discount_price: <input type="text" name="discount_price" value={formData.discount_price} onChange={handleChange} /> </label><br />
            <input type="submit" value="Add" />
        </form>
    </div>
  );
};

export default Admin;

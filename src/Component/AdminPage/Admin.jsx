import React, { useState } from "react";
import "./Admin.css";
import { db, storage } from "../../firebase"; // assuming you have Firebase storage configured
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import bg from '../../Images/bg.mp4';  
const Admin = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    real_price: "",
    discount_price: "",
    description: "",
    imageUrl: "", // added to store image URL
  });

  const [file, setFile] = useState(null); // state to store the selected file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      
      // If a file is selected, upload it to Firebase Storage
      if (file) {
        const storageRef = ref(storage, `${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(snapshot.ref); // Get the file's URL
      }

      // Add the image URL to the form data
      const docRef = await addDoc(collection(db, "Products"), {
        ...formData,
        imageUrl, // save the image URL in Firestore
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset form
      setFormData({
        name: "",
        category: "",
        real_price: "",
        discount_price: "",
        description: "",
        imageUrl: "",
      });
      setFile(null); // clear the file input
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (<>
        <div className="background_video">
          <video id="myVideo" autoPlay muted loop>
              <source src={bg} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
      </div>

    <div className="card2 d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="w-100">
        <>
          <label htmlFor="file-input" className="drop-container">
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              accept="image/*"
              required=""
              id="file-input"
              onChange={handleFileChange} // handle file selection
            />
          </label>
        </>

        <div className="mb-3 mt-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name" // added name attribute for binding
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input
            type="text"
            className="form-control"
            name="category" // added name attribute for binding
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            name="real_price" // added name attribute for binding
            value={formData.real_price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Discounted Price:</label>
          <input
            type="number"
            className="form-control"
            name="discount_price" // added name attribute for binding
            value={formData.discount_price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            name="description" // added name attribute for binding
            rows="5"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
    </>
  );
};

export default Admin;

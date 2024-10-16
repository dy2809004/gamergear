import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import { db, storage } from "../../firebase"; // Your Firebase configuration
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    real_price: "",
    discount_price: "",
    description: "",
    imageUrl: "",
  });

  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null); // For tracking which product is being edited
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const userEmail = Cookies.get("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail !== "admin@gmail.com") {
      navigate('/'); // Redirect to login page if userEmail is not present
    }
  }, [userEmail, navigate]);

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validation: Check for empty fields
    const { name, category, real_price, discount_price, description } = formData;
    if (!name || !category || !real_price || !discount_price || !description || !file) {
      setErrorMessage("Please fill in all fields and upload an image.");
      return; // Exit if validation fails
    } else {
      setErrorMessage(""); // Clear error message if validation passes
    }

    try {
      let imageUrl = "";
      if (file) {
        const storageRef = ref(storage, file.name);
        const snapshot = await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      if (editingProductId) {
        // Update product
        const productRef = doc(db, "Products", editingProductId);
        await updateDoc(productRef, { ...formData, imageUrl });
      } else {
        // Add new product
        await addDoc(collection(db, "Products"), { ...formData, imageUrl });
      }

      // Reset form
      setFormData({
        name: "",
        category: "",
        real_price: "",
        discount_price: "",
        description: "",
        imageUrl: "",
      });
      setFile(null);
      setEditingProductId(null); // Reset editing state

      // Fetch updated products
      fetchProducts();
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingProductId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Products", id));
      // Fetch updated products
      fetchProducts();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const onLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      Cookies.remove("userEmail");
      navigate('/');
    }
  };

  return (
    <div>
      <nav className="navbar1">
        <ul>
          <li><Link to="/admin">Add/Update Product</Link></li>
        </ul>
      </nav>

      <div className="card2">
        <form onSubmit={handleSubmit}>
          <label htmlFor="file-input" className="drop-container">
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              accept="image/*"
              required
              id="file-input"
              onChange={handleFileChange}
            />
          </label>

          {Object.keys(formData).map((key) => (
            key !== "imageUrl" && (
              <div className="mb-3" key={key}>
                <label className="form-label">{key.replace("_", " ").toUpperCase()}:</label>
                {key === "description" ? (
                  <textarea
                    className="form-control"
                    name={key}
                    rows="5"
                    value={formData[key]}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={key.includes("price") ? "number" : "text"}
                    className="form-control"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                )}
              </div>
            )
          ))}

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit" className="btn btn-primary">
            {editingProductId ? "Update" : "Add"} Product
          </button>
        </form>
      </div>

      <div className="product-list">
        <h3>Existing Products</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discounted Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.real_price}</td>
                <td>{product.discount_price}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="logout_btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Admin;

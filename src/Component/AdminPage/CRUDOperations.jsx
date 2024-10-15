/*import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase"; // Adjust the import path accordingly
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CRUDOperations = () => {
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
  const [editingProductId, setEditingProductId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      if (editingProductId) {
        const productRef = doc(db, "Products", editingProductId);
        await updateDoc(productRef, { ...formData, imageUrl });
        setEditingProductId(null);
      } else {
        await addDoc(collection(db, "Products"), { ...formData, imageUrl });
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error processing document: ", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      real_price: "",
      discount_price: "",
      description: "",
      imageUrl: "",
    });
    setFile(null);
    setEditingProductId(null);
  };

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    const productsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsList);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      real_price: product.real_price,
      discount_price: product.discount_price,
      description: product.description,
      imageUrl: product.imageUrl,
    });
    setEditingProductId(product.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Products", id));
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="form-container">
      <h2>{editingProductId ? "Edit Product" : "Add Product"}</h2>
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

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="number"
          name="real_price"
          value={formData.real_price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="discount_price"
          value={formData.discount_price}
          onChange={handleChange}
          placeholder="Discount Price"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <button type="submit">{editingProductId ? "Update" : "Add"}</button>
      </form>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h4>{product.name}</h4>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUDOperations;
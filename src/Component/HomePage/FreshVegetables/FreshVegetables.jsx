// src/components/FreshVegetables.jsx
import React, { useState, useEffect } from 'react';
import './FreshVegetables.css';
import { db, collection, getDocs } from '../../../firebase';
import HomePageProducts from './HomePageProducts/HomePageProducts';

function FreshVegetables() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Products"));
                const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="FreshVegetables">
            <div className="FreshVegetables_title">Fresh Vegetables</div>
            <div className="Card_Products">
                {products.map(product => (
                    <HomePageProducts key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default FreshVegetables;

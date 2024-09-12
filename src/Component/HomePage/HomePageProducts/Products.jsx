import React, { useState, useEffect, useContext } from 'react';
import './Products.css';
import { db, collection, getDocs, storage, ref, getDownloadURL } from '../../../firebase';
import HomePageProducts from './HomePageProducts';
import { CartContext } from '../../../CartContext';

function Products() {
    const [products, setProducts] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch all products in a single read operation
                const querySnapshot = await getDocs(collection(db, "Products"));
                const productsData = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const product = { id: doc.id, ...doc.data() };
                        const imageRef = ref(storage, `${product.name}.jpg`);
                        product.imageUrl = await getDownloadURL(imageRef);
                        return product;
                    })
                );
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        showAddToCartNotification();
    };

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    const showAddToCartNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    if (loading) {
        return <div></div>;
    }

    return (
        <div className="Products">
            <div className="Products_title">Latest Equipments</div>
            <div className="Card_Products">
                {products.map(product => (
                    <HomePageProducts
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        showNotification={showAddToCartNotification}
                    />
                ))}
            </div>

            <div className={`success ${showNotification ? 'show' : ''}`}>
                <div className="success__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none">
                        <path fillRule="evenodd" fill="#393a37" d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z" clipRule="evenodd"></path>
                    </svg>
                </div>
                <div className="success__title">Added to Cart</div>
                <div className="success__close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20">
                        <path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Products;
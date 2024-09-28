import React, { useContext, useEffect } from 'react';
import NavBar from '../HomePage/NavBar/NavBar';
import './CartPage.css';
import { CartContext } from '../../CartContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

function CartPage() {
    const { cart, updateQuantity, setCart, finalPrice, setFinalPrice } = useContext(CartContext);

    // Handle removing item from cart
    const handleRemove = (id) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            updateQuantity(id, item.quantity - 1);
        }
    };

    // Handle adding item to cart
    const handleAdd = (id) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            updateQuantity(id, item.quantity + 1);
        }
    };

    // Handle changing item quantity
    const handleQuantityChange = (id, value) => {
        const quantity = parseInt(value) || 0;
        updateQuantity(id, quantity);
    };

    // Handle removing item from cart completely
    const deleteFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Calculate total amount
    const totalAmount = cart.reduce((sum, item) => sum + (item.quantity * item.discount_price), 0);

    // Update final price with shipping cost
    useEffect(() => {
        setFinalPrice(totalAmount + totalAmount * 0.05);
    }, [totalAmount, setFinalPrice]);

    // Load cart from cookies when the component mounts
    useEffect(() => {
        const storedCart = Cookies.get('cart'); // Retrieve cart from cookies
        if (storedCart) {
            setCart(JSON.parse(storedCart)); // Safely parse and set the cart
        }
    }, [setCart]);

    // Store cart in cookies whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Store cart in cookies for 7 days
        } else {
            Cookies.remove('cart'); // Remove the cart if it's empty
        }
    }, [cart]);

    // Remove items with quantity 0
    useEffect(() => {
        setCart(cart.filter(item => item.quantity > 0));
    }, [cart, setCart]);

    return (
        <div className="CartPage">
            <NavBar />
            <div className="cartpagecontainer">
                <div className="cart-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Product Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {cart.length === 0 ? (
                            <tbody>
                                <tr>
                                    <td>Nothing in the cart. Add some items!</td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={index} className='table_row'>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.discount_price}</td>
                                        <td>
                                            <div className="product_quantity">
                                                <button className="quantity_btn quantity_btn_remove" onClick={() => handleRemove(item.id)}>-</button>
                                                <input type='number' className="quantity_choosen" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value)} readOnly />
                                                <button className="quantity_btn quantity_btn_add" onClick={() => handleAdd(item.id)}>+</button>
                                            </div>
                                        </td>
                                        <td>{item.quantity * item.discount_price}</td>
                                        <td>
                                            <button className="bin-button" onClick={() => deleteFromCart(item.id)}>
                                                {/* Bin icon SVG */}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
                <div className="cartSummary">
                    <div className="cartSummary_header">SUMMARY</div>
                    <div className="cartSummary_total"> 
                        <div className="cartSummary_total_title"> Cart Total : </div> 
                        <div className="cartSummary_total_Summary">{totalAmount.toFixed(2)} &#8377;</div>
                    </div>
                    <div className="cartSummary_total"> 
                        <div className="cartSummary_total_title"> Shipping Cost : </div> 
                        <div className="cartSummary_total_Summary">5 %</div>
                    </div>
                    <div className="cartSummary_total"> 
                        <div className="cartSummary_total_title"> Discount : </div> 
                        <div className="cartSummary_total_Summary">0 &#8377;</div>
                    </div>
                    <hr className='ms-3 me-3' />
                    <div className="cartSummary_total"> 
                        <div className="cartSummary_total_title"> Total : </div> 
                        <div className="cartSummary_total_Summary">{finalPrice.toFixed(2)} &#8377;</div>
                    </div>
                    <Link to={`/Payment`} className='link_payment' >
                        <button className="btn">
                            <span className="text">Proceed To Checkout</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartPage;

import React, { useState } from 'react'
import './FreshVegetables.css'

function FreshVegetables() {

    const [quantity, setQuantity] = useState(0);

    const handleRemove = (e) => {
        setQuantity(quantity => (quantity <= 0 ? 0 : quantity - 1  ))
    } 

    const handleAdd = (e) => {
        setQuantity(quantity => quantity + 1);
    }

    const add_to_cart = (e) => {
        console.log(quantity);
    }

  return (
        <div className="FreshVegetables">
            <div className="FreshVegetables_title">Fresh Vegetables</div>
            <div className="Card_Products">
                <div className="card">
                    <div className="card_product_image"></div>
                    <div className="card_section_1">
                        <div className="card_product_category">VEGETABLES</div>
                        <div className="card_product_name">Potatoes - Fresh from Farmer</div>
                    </div>
                    <div className="card_section_2">
                        <div className="card_product_real_price">Rs. 100</div>
                        <div className="card_product_discount_price">70 Rs/Kg</div>
                    </div>
                    <div className="card_section_3">
                        <div className="product_quantity">
                            <button className="quantity_btn quantity_btn_remove" onClick={handleRemove} >-</button>
                            <input type='text' className="quantity_choosen" placeholder = {quantity} id='quantity_input'/>
                            <button className="quantity_btn quantity_btn_add" onClick={handleAdd} >+</button>
                        </div>
                        <button className='add_to_cart_btn' onClick={add_to_cart} >Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default FreshVegetables
import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItems = (
        <ul className={classes['cart-items']} >
            {cartCtx.items.map(meal => <
                CartItem
                name={meal.name}
                price={meal.price}
                amount={meal.amount}
                key={meal.id}
                onRemove={cartItemRemoveHandler.bind(null, meal.id)}
                onAdd={cartItemAddHandler.bind(null, meal)}
            />)}
        </ul >
    );
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Cancel</button>
                {hasItems && <button className={classes.button} >Order</button>}
            </div>
        </Modal>
    )
};

export default Cart;

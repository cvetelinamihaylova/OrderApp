import { Fragment, useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

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

    const submitHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-demo-f2cc5-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        user: userData,
                        orderedItems: cartCtx.items
                    }
                )
            }
        );
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };
    const orderHandler = () => {
        setIsCheckout(true);
    };

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Cancel</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>;
    const cartModalContent = <Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions}
    </Fragment>
    const isSubmittingContent = <p>Sending ordering data...</p>;
    const didSubmitContent = <Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Cancel</button>
        </div>;
    </Fragment>;

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingContent}
            {!isSubmitting && didSubmit && didSubmitContent}
        </Modal>
    )
};

export default Cart;

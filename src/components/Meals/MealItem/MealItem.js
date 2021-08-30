import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const onAddToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            amount: amount,
            price: props.price,
            name: props.name
        })
    };
    return (
        <li className={classes.meal}>
            <div>
                <div><h3>{props.name}</h3></div>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <MealItemForm onAddToCart={onAddToCartHandler} />
        </li>
    )
};

export default MealItem;
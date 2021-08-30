import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const inputAmountRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = +inputAmountRef.current.value;
        console.log(enteredAmount)
        if (
            enteredAmount.toString().trim().length === 0 || 
            enteredAmount < 1 || 
            enteredAmount > 6) {
            setAmountIsValid(false);
            return;
        };
        setAmountIsValid(true);
        props.onAddToCart(enteredAmount);
    };

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <Input
                ref={inputAmountRef}
                label="Amount"
                input={{
                    id: props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter valid amount (1-5)</p>}
        </form>
    )
};

export default MealItemForm;

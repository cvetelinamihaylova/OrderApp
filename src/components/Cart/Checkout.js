import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 5;

const Checkout = (props) => {
    const [inputFormValidity, setInputFormValidity] = useState({
        name: true,
        city: true,
        street: true,
        postal: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = !isNotFiveChars(enteredPostal);

        setInputFormValidity({
            name: enteredNameIsValid,
            city: enteredCityIsValid,
            street: enteredStreetIsValid,
            postal: enteredPostalIsValid
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalIsValid;

        if (!formIsValid) {
            return;
        };

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        })

    };

    const nameControlClasses = `${classes.control} ${inputFormValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${inputFormValidity.street ? '' : classes.invalid}`;
    const postalControlClasses = `${classes.control} ${inputFormValidity.postal ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${inputFormValidity.city ? '' : classes.invalid}`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!inputFormValidity.name && <p>Please enter valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!inputFormValidity.street && <p>Please enter valid street!</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!inputFormValidity.postal && <p>Please enter valid postal!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!inputFormValidity.city && <p>Please enter valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
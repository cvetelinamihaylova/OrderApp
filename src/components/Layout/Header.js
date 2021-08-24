import classes from './Header.module.css';
import { Fragment } from 'react';
import mealsImage from '../../assets/meals.jpg'

const Header = (props) => {

    return (
        <Fragment>
            <header className={classes.header}>
                <h2>Order app</h2>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="a meal image"/>
            </div>
        </Fragment>
    )
};

export default Header;
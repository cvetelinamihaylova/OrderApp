import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';


const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}/>
};
const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            {props.children}
        </div>
    );
};

const Modal = props => {
    const modalElement = document.getElementById('overlays');

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, modalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                modalElement
            )}
        </Fragment>
    )
};

export default Modal;
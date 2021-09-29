import { createContext } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item)=>{},
    removeItem: (id)=>{},
    clearCart: ()=>{}
});

export default CartContext;

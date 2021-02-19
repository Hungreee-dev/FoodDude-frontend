import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function useOrder() {
    return useContext(OrderContext);
}

export function OrderProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    // console.log('Cart Updated!', cartItems);
    const setCart = useCallback((items) => {
        console.log('Cart updated');
        setCartItems(items);
    }, []);
    useEffect(() => {
        const totals = cartItems.reduce((prev, curr) => prev + Number(curr.quantity * curr.price), 0);
        setTotal(totals);
    }, [cartItems]);
    const value = {
        cartItems,
        total,
        setCart,
    };
    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

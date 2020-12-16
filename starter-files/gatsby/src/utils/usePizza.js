import React, { useContext, useState } from 'react'
import OrderContext from '../components/OrderContext'

export default function usePizza({pizzas, inputs}){
    // const [order, setOrder] = useState([]);
    const [order, setOrder] = useContext(OrderContext)
    function addToOrder(orderedPizza){
        setOrder([...order, orderedPizza]);
    }
    function removeFromOrder(index){
        console.log("order", order);
        console.log("index", index);

        setOrder([
            ...order.slice(0, index),
            ...order.slice(index + 1)
        ]);
    }
    return {
        order,
        addToOrder,
        removeFromOrder
    }
}
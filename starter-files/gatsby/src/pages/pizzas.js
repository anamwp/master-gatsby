import React from 'react'
import PizzaList from '../components/PizzaList';

export default function PizzaPage({data}){
    const pizzas = data.pizzas.nodes;
    return <>
        <h2>This is Pizza page.</h2>
        <PizzaList pizzas={pizzas}/>
    </>
}

export const query = graphql`
    query PizzaQuery {
        pizzas: allSanityPizza {
            nodes{
                name
                id
                slug {
                    current
                }
                toppings {
                    id
                    name
                }
                image {
                    asset {
                        fluid(maxWidth: 400){
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`
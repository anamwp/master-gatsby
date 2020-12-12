import React from 'react'
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzaPage({data, pageContext}){
    const pizzas = data.pizzas.nodes;
    return <>
        <SEO title={
            pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : `All Pizzas`
        }/>
        <ToppingsFilter activeTopping={pageContext.topping} />
        <PizzaList pizzas={pizzas}/>
    </>
}

export const query = graphql`
    query PizzaQuery($toppingRegex: String) {
        pizzas: allSanityPizza(
            filter:{
                toppings: {
                    elemMatch: {
                        name: {
                            regex: $toppingRegex
                        }
                    }
                }
            }
        ) {
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
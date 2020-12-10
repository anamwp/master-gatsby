import path from 'path';
async function turnPizzaIntoPages({graphql, actions}){
    // get a page template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
    // query for all pizza
    const {data} = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug{
                        current
                    }
                }
            }
        }
    `);
    data.pizzas.nodes.forEach(pizza => {
        actions.createPage({
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context:{
                slug: pizza.slug.current
            }
        })
    });
}
async function turnToppingsIntoPages({graphql, actions}){
    // get a page template for this page
    const ToppingTemplate = path.resolve('./src/pages/pizzas.js');
    // query for all pizza
    const {data} = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    id
                    name
                }
            }
        }
    `);
    data.toppings.nodes.forEach(topping => {
        actions.createPage({
            path: `topping/${topping.name}`,
            component: ToppingTemplate,
            context:{
                topping: topping.name,
                toppingRegex: `/${topping.name}/i`
            }
        })
    });
}

export async function createPages(params){
    await Promise.all([
        turnPizzaIntoPages(params),
        turnToppingsIntoPages(params)
    ]);
}

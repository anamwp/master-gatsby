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
    console.log(data);
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

export async function createPages(params){
    await turnPizzaIntoPages(params);
}
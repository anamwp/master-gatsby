import path, { resolve } from 'path';
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

async function turnSlicemastersIntoPages({graphql, actions}){
    const {data} = await graphql(`
        query{
            slicemasters: allSanityPerson{
                totalCount
                nodes{
                    name
                    id
                    slug{
                        current
                    }
                }
            }
        }
    `);
    data.slicemasters.nodes.forEach( (slicemaster) => {
        actions.createPage({
            component: resolve('./src/templates/Slicemaster.js'),
            path: `slicemaster/${slicemaster.slug.current}`,
            context: {
                name: slicemaster.person,
                slug: slicemaster.slug.current
            }
        })
    } )
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
    console.log(
        `There are ${data.slicemasters.totalCount} total people and we have ${pageCount} pages with ${pageSize} per page` 
    );
    Array.from({length: pageCount})
        .forEach((_, i) => {
            console.log(`creating pages ${i}`);
            actions.createPage({
                path: `/slicemasters/${i + 1}`,
                component: path.resolve('./src/pages/slicemasters.js'),
                context: {
                    skip: i * pageSize,
                    currentPage: i + 1,
                    pageSize, 
                }
            })
        })
}

export async function createPages(params){
    await Promise.all([
        turnPizzaIntoPages(params),
        turnToppingsIntoPages(params),
        turnSlicemastersIntoPages(params)
    ]);
}

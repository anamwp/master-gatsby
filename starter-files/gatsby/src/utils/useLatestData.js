import { useState, useEffect } from 'react';
const gql = String.raw;

const deets = `
    name
    _id
    image{
        asset{
            url 
            metadata {
                lqip
            }
        }
    }
`

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();
    // Use a side effect to fetcht he data from the graphql endpoint
    useEffect(function () {
    console.log('FETCHING DATA');
    // when the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: gql`
                query {
                    StoreSettings(id: "downtown") {
                        name
                        slicemaster {
                            ${deets}
                        }
                        hotSlices {
                            ${deets}
                        }
                    }
                }
            `,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res.data);
            // TODO: checl for errors
            // set the data to state
            setHotSlices(res.data.StoreSettings.hotSlices);
            setSlicemasters(res.data.StoreSettings.slicemaster);
        })
        .catch( err => {
            console.log('err', err);
        });
    }, []);
    return {
        hotSlices,
        slicemasters,
    };
}

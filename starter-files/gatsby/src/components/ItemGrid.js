import React from 'react'
import { ItemsGrid, ItemStyles } from '../styles/Grid'

export default function ItemGrid({items}) {
    return (
        <div>
            <ItemsGrid>
                {items.map( item => (
                    <ItemStyles>
                        <p>
                            <span className="mark">{item.name}</span>
                        </p>
                        <img 
                        width="500"
                        height="400"
                        src={`${item.image.asset.url}?w=500&h=400&fit=crop`} 
                        alt={item.name}
                        style={{
                            background: `url(${item.image.asset.metadata.lqip})`,
                            backgroundSize: 'cover'
                        }}
                        />
                    </ItemStyles>
                ) )}
            </ItemsGrid>
        </div>
    )
}

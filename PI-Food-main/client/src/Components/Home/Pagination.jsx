import React from 'react'; 


export default function Pagination({recipesPage, recipesState, paged}) {
    const pages = [];

    for (let i = 1; i <= Math.ceil(recipesState/recipesPage); i++) {
        pages.push(i)
    }
    console.log(recipesPage, recipesState)

    return (
        <div>
            {pages.length <= 1 ? <></> : <nav> 
                <ul>
                    {pages?.map(p => (
                        <li key={p}>
                            <button onClick = {()=> paged(p)}>{p}</button>
                        </li>
                    ))}
                </ul>
                </nav> 
            }
        </div>
    )
}
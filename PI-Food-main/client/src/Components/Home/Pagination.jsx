import React from 'react'; 
import './Pagination.css'



export default function Pagination({recipesPage, recipesState, paged, setPage, page, max}) {
    const pages = [];

    for (let i = 1; i <= Math.ceil(recipesState/recipesPage); i++) {
        pages.push(i)
    }

    const previous = () => {
        setPage(page - 1)
    }
    
    const next = () => {
        setPage(page + 1)
    }

    return (
        <div>
            {pages.length <= 1 ? <></> : <nav className='nav'> 
                <button className='b' disabled={ page===1 } onClick={previous}>Prev</button>
                <ul>
                    {pages?.map(p => (
                        <li key={p}>
                            <button className='numberpages' onClick = {()=> paged(p)}>{p}</button>
                        </li>
                    ))}
                </ul>
                <button className='b' disabled={page===max || page > max} onClick={next}>Next</button>
                </nav> 
            }
        </div>
    )
}
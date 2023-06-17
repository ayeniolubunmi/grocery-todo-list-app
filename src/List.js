import React from 'react'
import {FaEdit,FaTrash} from 'react-icons/fa'

export default function List({items, removeItem, editItem}) {
  return (
    <div className='grocery-list'>
        {items?.map((item)=>{
            const {id, title} = item;
            return <article key={id} className='grocery-item'>
                <p>{title}</p>
                <div className='btn-container'>
                    <button type="submit" className='edit-btn'>
                        <FaEdit onClick={()=>editItem(id)} />
                    </button>
                    <button type="submit" className='delete-btn'>
                        <FaTrash onClick={()=>removeItem(id)} />
                    </button>
                </div>
            </article>
        })}
    </div>
  )
}

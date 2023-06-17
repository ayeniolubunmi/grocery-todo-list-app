import React, { useEffect, useState } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = ()=>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return []
  }
}

export default function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show:false, msg:'', type:''})

  

  function handleSubmit(e){
    e.preventDefault();
    if(!name){
      showAlert(true,'Please enter value','danger');
    }
    else if(name && isEditing){
      setList(list.map((item)=>{
        if(item.id===editId){
          return{...item,title:name}
        }
        return item
      }))
      setName('')
      setIsEditing(false)
      setEditId(null)
      showAlert(true,'value changed','danger')
    }else{
      showAlert(true,'Item add to list', 'success')
      const newItem = {id: new Date().getTime().toString(), title:name}
      setList([...list, newItem]);
      setName('')
    }
  }
  const showAlert = (show=false, msg='', type='')=>{
  setAlert({show,msg,type})
  }

  const clearItem = ()=>{
    showAlert(true, 'Clear items','Danger');
    setList([])
  }

  const removeItem =(id)=>{
    showAlert(true,'Remove item', 'danger');
    setList(list.filter((item)=>item.id !== id))
  }

  const editItem=(id)=>{
    const specificItem = list.find((item)=>item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  }

  useEffect(() => {
   localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      <h3>Grocery bud</h3>
      <div className='form-control'>
        <input type="text" name="" className='grocery'
        value={name} 
        onChange={(e)=>setName(e.target.value)} 
        placeholder='e.g eggs'/>
        <button type="submit" className='submit-btn'>
          {isEditing ? 'edit':'submit'}
        </button>
      </div>
    </form>
    <div className='grocery-container'>
      <List items={list} removeItem={removeItem} editItem={editItem}/>
      <button type="" className='clear-btn' onClick={clearItem} >clear item</button>
    </div>
  </section>
}
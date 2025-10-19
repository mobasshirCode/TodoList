import { useEffect, useState } from 'react'
import uuid4 from 'uuid4'
import Navbar from './componenets/Navbar'
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteSweep } from "react-icons/md";


function App() {
  const [showFinished, setShowFinished] = useState(true)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(()=>{
    let todoString = localStorage.getItem("todos") // getting the todos from local storage using "todos" key
    if(todoString) {  // check if there is data or not so that it does not lead to can't read from null blah blah problem
      let oldTodos = JSON.parse(todoString)
      setTodos(oldTodos)
    }
  },[]) // run only once at the beginning

  const saveToLS = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos)) // key value pairs where key is quotes i.e "todos"
  }

  const toggleFinished = ()=>{
    setShowFinished(!showFinished)
  }

  const handleChange = (e)=> {
    setTodo(e.target.value)
  }

  const handleAdd = ()=>{
    setTodos([...todos, {id: uuid4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleCheck = (e)=> {
    let id = e.target.name 
    let index = todos.findIndex((item) => {
      return item.id === id;
    })
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  const handleEdit = (e,id)=>{
    let t = todos.filter((item)=>{
      return item.id === id
    })
    setTodo(t[0].todo)
    const newTodos = todos.filter((item)=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e,id)=>{
    let newTodos = todos.filter((item)=> {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto bg-cyan-100 m-10 p-5 min-h-[70vh] md:w-1/2 rounded-2xl">
      <div className='add'>
        <h2 className='text-2xl font-bold'>Add a Todo</h2>
        <input type="text" autoFocus value={todo} name='name'
        onChange={handleChange} 
        className='bg-white w-full py-2 px-4 my-2 rounded-lg'/>
        <div>
          <button className='w-full text-white font-bold bg-cyan-600 hover:bg-cyan-800 p-2 my-2 rounded-lg disabled:bg-cyan-400 hover:cursor-pointer '
          onClick={handleAdd}
          disabled={todo.length < 3}>
            Save
          </button>
        </div>
      </div>
        <input type="checkbox" name="finished" 
        onChange={toggleFinished}
        checked={showFinished} 
        className='my-4 mx-2 hover:cursor-pointer'/>Show Finished
        {/* <hr /> */}
        <h2 className='font-bold text-xl'>Your Todos</h2>
      <div className="todos">
        {todos.length === 0 && <div className='empty m-5'>Todo list is empty.</div>}
        {todos.map(item => {
          return (showFinished || !item.isCompleted) && <div key={item.id} className="content flex items-center justify-between my-2">
                    <div className='flex items-center'>
                        <input type="checkbox" className='mx-3 hover:cursor-pointer' 
                        name={item.id}
                        onChange={handleCheck}
                        checked={item.isCompleted}/>
                        <h4 className={`text-lg font-semibold ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</h4>
                    </div>
                    <div className="btns flex">
                        <button className='py-1 px-2 text-green-500 text-2xl hover:cursor-pointer'
                        onClick={(e)=>{
                          handleEdit(e,item.id)
                        }}
                        ><TbEdit/></button>
                        <button className='py-1 px-2 text-red-500 text-2xl hover:cursor-pointer'
                        onClick={(e)=> {
                          handleDelete(e,item.id)
                        }}
                        ><MdOutlineDeleteSweep /></button>
                    </div>
                 </div>
        })}
      </div>
    </div>
    </>
  )
}

export default App

import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from './Todo';
import { v4 as uuidv4 } from 'uuid';

function AddTodo() {
  const { siteHeading, title, setTitle, desc, setDesc, todos, setTodos, saveTodoToStorage, btnText, todoId, setBtnText, setTodoId } = useContext(TodoContext);
  function resetInputs(){
    setTitle("");
    setDesc("");
  }
  function saveTodo() {
    if (title == "") {
      toast.error('Please fill the title!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else if (desc == "") {
      toast.error('Please fill the description!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      let updatedTodos;
      if(btnText == "Update"){
        updatedTodos = todos.map(todo => {
          if(todo.id == todoId){
            todo.title = title,
            todo.desc = desc
          }
          return todo;
        });
        setBtnText("Save");
        setTodoId("");
      }else{
        updatedTodos = [...(todos || []),{ id: uuidv4(), title, desc }];
      }
      setTodos(updatedTodos);
      saveTodoToStorage(updatedTodos);
      resetInputs();
    }
  }
  function setValue(e) {
    e.target.name == "title" ? setTitle(e.target.value) : setDesc(e.target.value);
  }

  return (
    <>
      <ToastContainer />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="bg-white flex flex-col w-full md:py-8 mt-8 md:mt-0">
            <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">{siteHeading}</h1>
            <p className="leading-relaxed mb-5 text-gray-600">Create your todo</p>
            <div className="relative mb-4">
              <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
              <input value={title} onInput={setValue} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="desc" className="leading-7 text-sm text-gray-600">Description</label>
              <textarea value={desc} onInput={setValue} id="desc" name="desc" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg w-[100px]" onClick={saveTodo}>{btnText}</button>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container py-4 mx-auto flex flex-wrap">
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <React.Fragment key={todo.id}>
                <Todo todo={todo} />
              </React.Fragment>
            ))
          ) : (
            <p>No todos found</p>
          )}
        </div>
      </section>
    </>
  );
}

export default AddTodo;
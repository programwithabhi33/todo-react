import { useState, useEffect } from "react";
import { TodoContext } from "./TodoContext";
import AddTodo from "./AddTodo";

function App() {

  const [siteHeading, setSiteHeading] = useState("TODO");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [btnText, setBtnText] = useState("Save");
  const [todoId, setTodoId] = useState("");
  useEffect(() => {
    let todoList = JSON.parse(localStorage.getItem("todos"));
    setTodos(todoList);
  }, [])

  function saveTodoToStorage(todosList){
    localStorage.setItem("todos", JSON.stringify(todosList))
  }
  

  return (
    <div>
      <TodoContext.Provider value={{ siteHeading, setSiteHeading, title, setTitle, desc, setDesc, todos, setTodos, saveTodoToStorage, btnText, setBtnText, todoId, setTodoId }}>
        <AddTodo />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
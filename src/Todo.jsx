import { useContext } from "react";
import { TodoContext } from "./TodoContext";

const Todo = ({ todo }) => {
    const { todos, setTodos, saveTodoToStorage, setTitle, setDesc, setBtnText, setTodoId } = useContext(TodoContext);

    function deleteTodo(id){
        let updatedTodos = todos.filter(todo => {
            if(todo.id != id) return todo;
        });
        setTodos(updatedTodos);
        saveTodoToStorage(updatedTodos);
    }
    function editTodo(todo){
        setTitle(todo.title);
        setDesc(todo.desc);
        setBtnText("Update");
        setTodoId(todo.id);
    }
    return (
        <>
            <div className="p-4 lg:w-1/3 md:w-1/2 w-full">
                <div className="flex border-2 rounded-lg border-indigo-500 border-opacity-50 p-8 sm:flex-row flex-col">
                    <div className="flex-grow">
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{todo.title}</h2>
                        <p className="leading-relaxed text-base">{todo.desc}</p>
                        <a onClick={ _=> editTodo(todo)} className="mr-3 inline-flex items-center bg-blue-500 text-white p-2 rounded-md">
                            Edit
                        </a>
                        <a onClick={ _=> deleteTodo(todo.id)} className="mt-3 inline-flex items-center bg-red-500 text-white p-2 rounded-md">
                            Delete
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
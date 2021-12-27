import { createContext, useEffect, useState } from 'react';

const TodosContext = createContext({
    todos: [],
    loading: false,
    addTodo: (todo) => { },
    deleteTodo: (todo) => { },
    updateTodo: (todo) => { },
    clearAll: () => { }
})

export function TodosContextProvider(props) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem("todos")) {
            setTodos(JSON.parse(localStorage.getItem("todos")));
        }
        else {
            localStorage.setItem("lastId", "0");
        }
        setLoading(false);
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const addTodo = (todo) => {
        setTodos((prevTodos) => {
            let t = [...prevTodos];
            t.push(todo);
            return t;
        })
    }

    const deleteTodo = (todo) => {
        setTodos((prevTodos) => {
            let t = [...prevTodos];
            t = t.filter(t => t.id !== todo.id);
            return t;
        })
    }

    const updateTodo = (todo) => {
        setTodos((prevTodos) => {
            let t = [...prevTodos];
            t = t.map(x => x.id === todo.id ? todo : x);
            return t;
        })
    }

    const clearAll = () => {
        setTodos([]);
    }

    const context = {
        todos: todos,
        loading: loading,
        addTodo: addTodo,
        deleteTodo: deleteTodo,
        updateTodo: updateTodo,
        clearAll: clearAll
    };

    return (
        <TodosContext.Provider value={context}>
            {props.children}
        </TodosContext.Provider>
    )
}

export default TodosContext;

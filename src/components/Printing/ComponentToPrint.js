import React, { useContext } from 'react';
import './ComponentToPrint.css';
import TodosContext from '../../store/todos-context';

export const ComponentToPrint = React.forwardRef((props, ref) => {

    const ctx = useContext(TodosContext);

    return (
        <div ref={ref} className='d-flex justify-content-center'>
            <ul className='m-4 col-8'>
                <h1 id='title'>TODO</h1>
                {ctx.todos.map(todo =>
                    <li id='item' key={todo.id}>
                        <div id='todoContent'>{todo.text}</div>
                        <input id='checkbox' type='checkbox' />
                    </li>)}
            </ul>
        </div>
    )
})


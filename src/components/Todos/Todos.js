import { useContext } from 'react';
import './Todos.css';
import emptyIcon from '../../assets/empty.png'
import Container from '../UI/Container';
import Loading from '../UI/Loading/Loading';
import TodosContext from '../../store/todos-context';

const Todos = () => {
    const ctx = useContext(TodosContext);

    const toggleCompleted = (todo) => {
        todo.isCompleted = !todo.isCompleted;
        ctx.updateTodo(todo);
    }

    if (ctx.loading) {
        return <Loading />
    }

    if (ctx.todos.length == 0) {
        return (
            <div id='empty' className='d-flex flex-column justify-content-center mt-5'>
                <img src={emptyIcon} alt='no tasks' />
                <h1 className='text-center'>No tasks</h1>
            </div>
        )
    }

    return (
        <Container>
            <ul className='list-group '>
                {ctx.todos.map(todo =>
                    <li
                        key={todo.id}
                        id={todo.id}
                        className='item'
                    >
                        <input type='checkbox'
                            className='checkbox'
                            checked={todo.isCompleted}
                            onChange={() => toggleCompleted(todo)}
                        />
                        <span className='content'>{todo.text}</span>
                        <input type='button'
                            onClick={() => ctx.deleteTodo(todo)}
                            value='Delete'
                            className='btn'
                            id='button' />
                    </li>)}
            </ul>
        </Container >
    )
}

export default Todos
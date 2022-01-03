import { useContext, useState } from 'react';
import { SortableItem, swapArrayPositions } from 'react-sort-list';
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

    const [element, setElement] = useState(null);

    const dragStart = (e) => {
        setElement(ctx.todos.filter(x => x.id == e.target.id)[0]);
        e.target.classList.add('drag');

        e.dataTransfer.dropEffect = 'move';
    }

    const cls = e => {
        e.target.classList.remove('over');
    }

    const dragOver = (e) => {
        e.preventDefault();

        e.target.classList.add('over')
    }

    const dragExit = e => {

        cls(e);
    }

    const dragLeave = e => {
        e.stopPropagation();

        cls(e);
    }

    const dragEnd=e=>{
        
        document.getElementById(element.id).classList.remove('drag');
    }

    const drop = e => {

        e.stopPropagation();

        let newList = [...ctx.todos];
        let index = newList.indexOf(element);
        document.getElementById(e.target.id).classList.remove('over');
        document.getElementById(element.id).classList.remove('drag');
        newList.splice(index, 1);

        if (e.target.id == -1) {
            
            newList.splice(0, 0, element);
            ctx.setTodos(newList);
            return;
        }

        let a = ctx.todos.filter(x => x.id == e.target.id)[0];
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id == a.id) {
                index = i + 1;

                break;
            }
        }
        newList.splice(index, 0, element);
        ctx.setTodos(newList);
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
                <li className='zero'
                    id={-1}
                    key={-1}
                    onDrop={drop}
                    onDragOver={dragOver}
                    onDragLeave={dragLeave}
                    onDragExit={dragExit}
                />
                {ctx.todos.map((todo, index) =>
                    <li
                        onDragLeave={dragLeave}
                        onDragStart={dragStart}
                        onDragOver={dragOver}
                        onDrop={drop}
                        onDragEnd={dragEnd}
                        onDragExit={dragExit}
                        draggable
                        className='item'
                        id={todo.id}
                        key={index}
                    >
                        <input type='checkbox'
                            className='checkbox'
                            checked={todo.isCompleted}
                            onChange={() => toggleCompleted(todo)}
                        />
                        <span className='content'>{todo.text} </span>
                        <span onClick={() => ctx.deleteTodo(todo)}
                            value='Delete'
                            id='button'
                            className="btn material-icons">
                            clear
                        </span>
                    </li>)}
            </ul>
        </Container >
    )
}

export default Todos
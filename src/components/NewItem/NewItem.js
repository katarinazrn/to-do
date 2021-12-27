import { useState, useContext } from 'react';
import './NewItem.css';
import Container from '../UI/Container';
import TodosContext from '../../store/todos-context';

const NewItem = (props) => {

    const [text, setText] = useState('');
    const ctx = useContext(TodosContext);

    const addTask = (e) => {
        e.preventDefault();

        if (text.trim() === '') return;

        const id = parseInt(localStorage.getItem("lastId")) + 1;
        localStorage.setItem("lastId", id);

        const todo = {
            id: id,
            text: text.trim(),
            isCompleted: false,
        };
        
        ctx.addTodo(todo);
        setText('');
    }

    return (
        <Container id='form' className='justify-content-between'>
            <form className='bd-highlight' onSubmit={addTask}>
                <input
                    placeholder='New task'
                    className='flex-grow-1 bd-highlight'
                    type='text'
                    name='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
                <input type='submit'  className='bd-highlight px-4' value='Add' />
            </form>
        </Container>
    )
}

export default NewItem;
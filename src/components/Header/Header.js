import React, { useRef, useContext } from 'react';
import './Header.css';
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from '../Printing/ComponentToPrint';
import TodosContext from '../../store/todos-context';

const Header = () => {

    const componentRef = useRef();
    const ctx = useContext(TodosContext);

    return (
        <div className='d-flex justify-content-center ' id='header'>
            <div>
                <h1 id='title'>TODO</h1>
                <div className='d-flex justify-content-center'>
                    <div id='printing'>
                        <ReactToPrint
                            id='print'
                            trigger={() => <span id='printButton'>Print todo list</span>}
                            content={() => componentRef.current}
                        />
                        <div style={{ display: "none" }}>
                            <ComponentToPrint ref={componentRef} />
                        </div>
                    </div>
                    <span id='separator'>|</span>
                    <span id='clearButton' onClick={() => ctx.clearAll()}>Clear All</span>
                </div>
            </div>
        </div>
    )
}

export default Header;
import React, { Fragment, useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

function EditTodo({ todo }) {
    const [description, setDescription] = useState(todo.description);
    const { updateTodo } = useContext(TodoContext);

    const updateDescription = (e) => {
        e.preventDefault();
        updateTodo(todo.todo_id, description);
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                Edit
            </button>
            <div className="modal fade" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setDescription(todo.description)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                            <button type="button" className="btn btn-warning" onClick={updateDescription}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditTodo;

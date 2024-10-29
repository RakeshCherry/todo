import React, { Fragment, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import EditTodo from './EditTodo';

const ListTodos = () => {
    const { todos, deleteTodo } = useContext(TodoContext);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>{new Date(todo.created_at).toLocaleString()}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;

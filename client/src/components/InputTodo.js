import React, { Fragment, useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

const InputTodo = () => {
    const [description, setDescription] = useState("");
    const { addTodo } = useContext(TodoContext);

    const onSubmitForm = (e) => {
        e.preventDefault();
        addTodo(description);
        setDescription("");
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">PERN Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add Todo</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;

// TodoContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    // Fetch all todos from the backend
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:8000/todos");
            if (!response.ok) throw new Error("Failed to fetch todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error("Error fetching todos:", err.message);
        }
    };

    // Add a new todo
    const addTodo = async (description) => {
        try {
            const body = { description };
            const response = await fetch("http://localhost:8000/todos", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
            if (!response.ok) throw new Error("Failed to add todo");
            getTodos(); // Refresh the list after adding
        } catch (err) {
            console.error("Error adding todo:", err.message);
        }
    };

    // Update a todo description
    const updateTodo = async (id, description) => {
        try {
            const body = { description };
            const response = await fetch(`http://localhost:8000/todos/${id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });
            if (!response.ok) throw new Error("Failed to update todo");
            getTodos(); // Refresh the list after updating
        } catch (err) {
            console.error("Error updating todo:", err.message);
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/todos/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete todo");
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error("Error deleting todo:", err.message);
        }
    };

    // Load todos on initial render
    useEffect(() => {
        getTodos();
    }, []);

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

import React, { createContext, useState, useEffect } from "react";
import { addDays, addWeeks, addYears, isAfter } from "date-fns";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);

    // Fetch all todos from the server
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:8000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
            setFilteredTodos(jsonData); // Initialize filteredTodos to full todos list
        } catch (err) {
            console.error("Error fetching todos:", err.message);
        }
    };

    // Add a new todo
    const addTodo = async (description) => {
        try {
            const response = await fetch("http://localhost:8000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description })
            });
            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
            setFilteredTodos([...filteredTodos, newTodo]);
        } catch (err) {
            console.error("Error adding todo:", err.message);
        }
    };

    // Update a todo description
    const updateTodo = async (id, description) => {
        try {
            const response = await fetch(`http://localhost:8000/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description })
            });
            const updatedTodo = await response.json();
            const updatedTodos = todos.map(todo =>
                todo.todo_id === id ? updatedTodo : todo
            );
            setTodos(updatedTodos);
            setFilteredTodos(updatedTodos);
        } catch (err) {
            console.error("Error updating todo:", err.message);
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:8000/todos/${id}`, { method: "DELETE" });
            const updatedTodos = todos.filter(todo => todo.todo_id !== id);
            setTodos(updatedTodos);
            setFilteredTodos(updatedTodos);
        } catch (err) {
            console.error("Error deleting todo:", err.message);
        }
    };

    // Filter todos by time period
    const filterTodos = (period) => {
        const now = new Date();
        let startDate;
        
        if (period === "daily") startDate = addDays(now, -1);
        else if (period === "weekly") startDate = addWeeks(now, -1);
        else if (period === "yearly") startDate = addYears(now, -1);

        const newFilteredTodos = todos.filter(todo => 
            isAfter(new Date(todo.created_at), startDate)
        );
        setFilteredTodos(newFilteredTodos);
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <TodoContext.Provider value={{ 
            todos: filteredTodos, 
            addTodo, 
            updateTodo, 
            deleteTodo, 
            filterTodos 
        }}>
            {children}
        </TodoContext.Provider>
    );
};




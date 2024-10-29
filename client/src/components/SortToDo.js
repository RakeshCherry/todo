import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';

const SortTodos = () => {
    const { filterTodos } = useContext(TodoContext);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = () => {
        if (startDate && endDate) {
            filterTodos(startDate, endDate);
        } else {
            alert("Please select both start and end dates.");
        }
    };

    return (
        <div>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={handleFilter}>Filter by Date</button>
        </div>
    );
};

export default SortTodos;


import './App.css';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import SortTodos from './components/SortToDo';
import { TodoProvider } from './contexts/TodoContext';

function App() {
    return (
        <TodoProvider>
            <div className="container">
                <InputTodo />
                <ListTodos />
            </div>
        </TodoProvider>
    );
}

export default App;

import { useState } from "react";

import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";

const initState = {
  id: "",
  content: "",
};

const initTodos = Array.from({ length: 3 }, (_, i) => ({
  id: crypto.randomUUID(),
  content: `待辦事項 ${i + 1}`,
}));

function App() {
  const [todoContent, setTodoContent] = useState("");
  const [todos, setTodos] = useState(initTodos);
  const [editState, setEditState] = useState(initState);

  function changeTodoContent(e) {
    setTodoContent(e.target.value);
  }

  function addNewTodo() {
    if (!todoContent) return;
    const newTodo = { id: crypto.randomUUID(), content: todoContent };
    setTodos((todos) => [...todos, newTodo]);
    setTodoContent("");
  }

  function editTodo(e) {
    setEditState((todo) => ({
      ...todo,
      content: e.target.value,
    }));
  }

  function saveEdit(id) {
    if (!editState.content) return;
    const index = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[index] = editState;
    setTodos(newTodos);
    setEditState(initState);
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="pt-10">
      <div className="container mx-auto px-6">
        <div className="grid gap-6">
          <InputTodo
            inputValue={todoContent}
            onChange={changeTodoContent}
            onClick={addNewTodo}
          />
          <TodoList
            todos={todos}
            editState={editState}
            setEditTodo={setEditState}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            saveEdit={saveEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

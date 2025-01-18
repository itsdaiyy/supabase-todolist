import { useEffect, useState } from "react";

import { createTodo, getTodos, updateTodo } from "./services/apiTodos";

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

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  function changeTodoContent(e) {
    setTodoContent(e.target.value);
  }

  async function addNewTodo() {
    if (!todoContent) return;
    const newTodo = { content: todoContent };
    try {
      // 新增待辦事項
      await createTodo(newTodo);

      // 獲取最新的待辦事項資料
      const todos = await getTodos();
      // 更新 todos 狀態
      setTodos(todos);
    } catch (err) {
      console.error("Error adding new todo:", err);
    } finally {
      // 清空輸入框
      setTodoContent("");
    }
  }

  function editTodo(e) {
    setEditState((todo) => ({
      ...todo,
      content: e.target.value,
    }));
  }

  async function saveEdit(id) {
    if (!editState.content) return;
    const updatedTodo = { content: editState.content };
    console.log(updatedTodo);
    console.log(id);
    try {
      const res = await updateTodo(updatedTodo, id);
      console.log(res);

      // 更新前端的 todos 狀態，保留順序
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo,
        ),
      );
    } catch (err) {
      console.error("Error updating todo:", err);
    } finally {
      // 清空編輯狀態
      setEditState(initState);
    }

    // const index = todos.findIndex((todo) => todo.id === id);
    // const newTodos = [...todos];
    // newTodos[index] = editState;
    // setTodos(newTodos);
    // setEditState(initState);
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

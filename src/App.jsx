import { useEffect, useState } from "react";

import {
  apiDeleteTodo,
  apiCreateTodo,
  apiGetTodos,
  apiUpdateTodo,
} from "./services/apiTodos";

import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";

const initState = {
  id: "",
  content: "",
};

// const initTodos = Array.from({ length: 3 }, (_, i) => ({
//   id: crypto.randomUUID(),
//   content: `待辦事項 ${i + 1}`,
// }));

function App() {
  const [todoContent, setTodoContent] = useState("");
  const [todos, setTodos] = useState([]);
  const [editState, setEditState] = useState(initState);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await apiGetTodos();
      if (res === null) {
        console.log(`建立 todo 失敗，請稍候再嘗試`);
        return;
      }
      setTodos(res);
    };
    fetchTodos();
  }, []);

  function changeTodoContent(e) {
    setTodoContent(e.target.value);
  }

  async function addNewTodo() {
    if (!todoContent) return;
    const newTodo = { content: todoContent };
    // 新增待辦事項
    const res = await apiCreateTodo(newTodo);

    if (res === null) {
      console.log(`建立 todo 失敗，請稍候再嘗試`);
      return;
    }

    // 獲取最新的待辦事項資料
    const todos = await apiGetTodos();

    if (todos === null) {
      console.log(`刷新 todos 失敗，請稍候再嘗試`);
      return;
    }

    // 更新 todos 狀態
    setTodos(todos);
    // 清空 input 資料
    setTodoContent("");
  }

  async function editTodo(e) {
    setEditState((todo) => ({
      ...todo,
      content: e.target.value,
    }));
  }

  async function saveEdit(id) {
    if (!editState.content) return;
    const updatedTodo = { content: editState.content.trim() };

    const res = await apiUpdateTodo(updatedTodo, id);

    if (res === null) {
      console.log("儲存 todo 失敗，請稍後再嘗試");
      return;
    }
    const updatedTodos = await apiGetTodos();

    if (updatedTodos === null) {
      console.log("刷新 todos 失敗，請稍後再嘗試");
      return;
    }
    setTodos(updatedTodos);

    // 清空編輯狀態
    setEditState(initState);
  }

  async function deleteTodo(id) {
    console.log("deleteId", id);
    const res = await apiDeleteTodo(id);
    if (res === null) {
      console.log(`刪除 id: ${id} - todo 失敗，請稍後再嘗試"`);
      return;
    }
    const updatedTodos = await apiGetTodos();
    setTodos(updatedTodos);
  }

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-[500px] rounded-md border p-10">
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

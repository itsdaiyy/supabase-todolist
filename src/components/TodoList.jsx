import { Button } from "./ui/button";
import { Input } from "./ui/input";

function TodoList({
  todos,
  editState,
  setEditTodo,
  deleteTodo,
  editTodo,
  saveEdit,
}) {
  return (
    <ol className="ms-4 list-decimal">
      {todos.map(({ id, content }) => (
        <li key={id} className="mb-4">
          {id !== editState.id && (
            <div className="flex items-center gap-4">
              <span> {content}</span>
              <div>
                <Button
                  variant="outline"
                  className="me-2"
                  onClick={() => setEditTodo({ id, content })}
                >
                  Edit
                </Button>
                <Button variant="outline" onClick={() => deleteTodo(id)}>
                  Delete
                </Button>
              </div>
            </div>
          )}

          {id === editState.id && (
            <div className="flex items-center gap-4">
              <Input
                value={editState.content}
                className="w-1/2"
                onChange={(e) => editTodo(e)}
              />
              <div>
                <Button
                  variant="outline"
                  className="me-2"
                  onClick={() => saveEdit(id)}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setEditTodo({
                      id: "",
                      content: "",
                    })
                  }
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export default TodoList;

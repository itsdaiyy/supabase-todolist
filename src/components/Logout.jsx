import { logout } from "@/services/apiAuth";
import { Button } from "./ui/button";
import { apiGetTodos } from "@/services/apiTodos";

function Logout({ user, setCurrentUser, setTodos }) {
  async function handleLogout() {
    await logout();
    setCurrentUser(null);

    const todos = await apiGetTodos();
    setTodos(todos);
  }

  return (
    <div>
      <span className="me-4">{user?.email}</span>
      <Button onClick={handleLogout} variant="outline">
        登出
      </Button>
    </div>
  );
}

export default Logout;

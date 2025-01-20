import Login from "./Login";
import Logout from "./Logout";

function AuthForm({ currentUser, setCurrentUser, setTodos }) {
  const isAuthenticated = currentUser?.role === "authenticated";
  return (
    <>
      {isAuthenticated ? (
        <Logout
          user={currentUser}
          setCurrentUser={setCurrentUser}
          setTodos={setTodos}
        />
      ) : (
        <Login setCurrentUser={setCurrentUser} setTodos={setTodos} />
      )}
    </>
  );
}

export default AuthForm;

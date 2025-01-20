import { useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";
import { Button } from "./ui/button";

function AuthForm({ currentUser, setCurrentUser, setTodos }) {
  const isAuthenticated = currentUser?.role === "authenticated";
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <>
      {isAuthenticated ? (
        <Logout
          user={currentUser}
          setCurrentUser={setCurrentUser}
          setTodos={setTodos}
        />
      ) : (
        <>
          <Button onClick={() => setHasAccount(!hasAccount)} className="mb-6">
            {hasAccount ? "註冊" : "登入"}
          </Button>
          {hasAccount ? (
            <Login setCurrentUser={setCurrentUser} setTodos={setTodos} />
          ) : (
            <SignUp setCurrentUser={setCurrentUser} setTodos={setTodos} />
          )}
        </>
      )}
    </>
  );
}

export default AuthForm;

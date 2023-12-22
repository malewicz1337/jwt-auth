import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { chechAuth, logout } from "./store/actions/authActions";
import { User } from "./models/User";
import UserService from "./services/UserService";

const App = () => {
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<User[]>([]);

  const state = useAppSelector(state => state.main);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(chechAuth());
    }
    return () => {};
  }, [dispatch]);

  if (state.loading) {
    return <h1>Loading...</h1>;
  }

  const handleGetUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log("Error at handle get users ", error);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center">
      <h1>Hello, `${state.authed ? "Authenticated" : "Guest"}`</h1>
      {state.authed ? (
        <>
          <h2>
            {state.user.isActivated
              ? "Email activated"
              : "Email is not activated"}
          </h2>
          <button
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <LoginForm />
      )}

      <button onClick={handleGetUsers}>Get Users</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </main>
  );
};

export default App;

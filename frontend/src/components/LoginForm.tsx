import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { login, registration } from "../store/actions/authActions";

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section>
      <input
        onChange={e => {
          setEmail(e.target.value);
        }}
        value={email}
        type="email"
        name="Email"
        placeholder="Email"
      />
      <input
        onChange={e => {
          setPassword(e.target.value);
        }}
        value={password}
        type="password"
        name="Password"
        placeholder="Password"
      />
      <button
        onClick={() => {
          dispatch(login({ email, password }));
        }}
        type="submit"
      >
        Login
      </button>
      <button
        onClick={() => {
          dispatch(registration({ email, password }));
        }}
        type="submit"
      >
        Register
      </button>
    </section>
  );
};

export default LoginForm;

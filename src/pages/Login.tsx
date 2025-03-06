import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser} from "../store/userSlice"; 
import { AppDispatch, RootState } from '../store/store';

const Login: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    setEmail("")
    setPassword("")
  };

  return (
    <section className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className={`border h-96 transition-all ${error ? 'border-2 border-red-600' : "border-slate-200 "} py-5 shadow-2xl flex items-center flex-col rounded w-96 bg-white`}
      >
        {!error ? <h2 className='text-2xl font-medium text-center mb-4'>Увійти</h2> : <h2 className="mb-4 text-center text-2xl text-red-600">{error}</h2>}
        <div className="w-full px-6 flex flex-col justify-center gap-5">
          <span className="flex flex-col gap-1">
            <label htmlFor="email-input" className="text-lg">Електронна Пошта</label>
            <input
              className="h-9 border border-slate-300 px-2 w-full rounded"
              type="email"
              placeholder="Введіть пошту"
              id="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span className="flex flex-col gap-1">
            <label htmlFor="password-input" className="text-lg">Пароль</label>
            <input
              className="h-9 border border-slate-300 px-2 w-full rounded"
              type="password"
              placeholder="Введіть пароль"
              id="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 transition-all cursor-pointer py-2.5 text-white font-medium rounded w-full"
            disabled={loading}
          >
            {loading ? "Завантаження..." : "Увійти"}
          </button>
          <p className="text-center">
            Немає облікового запису?
            <br />
            <span className="text-sky-500 hover:text-sky-600 hover:underline cursor-pointer">
              Зареєструватися
            </span>
          </p>
        </div>
      </form>

      
    </section>
  );
};

export default Login;

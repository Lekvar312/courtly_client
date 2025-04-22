import { useState } from "react";
import { signupService } from "../services/AuthServices";
import { AppDispatch } from "../store/store";
import { setUser } from "../store/userSlice";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Паролі не співпадають");
        return;
      }
      const data = await signupService({ name, email, password });
      dispatch(
        setUser({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      setEmail("");
      setName("");
      setPassword("");
      navigate("/");
    } catch (error: any) {
      setError(error.message || "Сталась помилка");
    }
  };
  return (
    <section className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className={`border transition-all ${
          error ? "border-red-400" : "border-slate-200"
        } py-5 shadow-2xl flex items-center flex-col rounded w-full sm:w-96 bg-white`}
      >
        <h2 className="text-2xl font-medium text-center transition-all mg-2 md:mb-4">Зареєструватись</h2>
        {error && <p className="text-red-400">{error}</p>}
        <div className="w-full px-6 flex flex-col justify-center gap-3 sm:gap-5">
          <span className="flex flex-col gap-0.5">
            <label htmlFor="password-input" className="text-sm">
              Ім`я
            </label>
            <input
              className="h-10 border border-slate-300 px-2 w-full rounded"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введіть ім`я"
              id="name-input"
            />
          </span>
          <span className="flex flex-col gap-0.5">
            <label htmlFor="email-input" className="text-sm">
              Електронна Пошта
            </label>
            <input
              className="h-10 border border-slate-300 px-2 w-full rounded"
              type="email"
              value={email}
              placeholder="Введіть пошту"
              onChange={(e) => setEmail(e.target.value)}
              id="email-input"
            />
          </span>
          <span className="flex flex-col gap-0.5">
            <label htmlFor="password-input" className="text-sm">
              Пароль
            </label>
            <input
              className="h-10 border border-slate-300 px-2 w-full rounded"
              type="password"
              value={password}
              placeholder="Введіть пароль"
              id="password-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
          <span className="flex flex-col gap-0.5">
            <label htmlFor="repeat-password-input" className="text-sm">
              Повторіть Пароль
            </label>
            <input
              className="h-10 border border-slate-300 px-2 w-full rounded"
              type="password"
              placeholder="Повторіть пароль"
              id="repeat-password-input"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </span>
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 transition-all cursor-pointer py-1.5 sm:py-2.5 text-white font-medium rounded w-full"
          >
            Зареєструватись
          </button>
          <p className="text-center">
            Вже є обліковий запис?
            <br />
            <span className="text-sky-500 hover:text-sky-600 hover:underline cursor-pointer">
              <Link to="/login">Увійти</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;

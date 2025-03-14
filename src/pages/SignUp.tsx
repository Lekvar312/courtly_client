import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link,} from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { signupUser } from "../store/userSlice";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(signupUser({ name, email, password })).unwrap();
    } catch (err: any) {
      console.log(err);
    }
    setEmail("");
    setName("");
    setPassword("");
  };
  return (
    <section className="w-full h-full flex justify-center items-center">
      {error && <p className="error">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className={`border transition-all border-slate-200 py-5 shadow-2xl flex items-center flex-col rounded w-full sm:w-96 bg-white`}
      >
        <h2 className="text-2xl font-medium text-center transition-all mg-2 md:mb-4">
          Зареєструватись
        </h2>
        <div className="w-full px-6 flex flex-col justify-center gap-3 sm:gap-5">
          <span className="flex flex-col gap-0.5">
            <label htmlFor="password-input" className="text-base sm:text-lg">
              Ім`я
            </label>
            <input
              className="h-9 border border-slate-300 px-2 w-full rounded"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введіть ім`я"
              id="name-input"
            />
          </span>
          <span className="flex flex-col gap-0.5">
            <label htmlFor="email-input" className="text-base sm:text-lg">
              Електронна Пошта
            </label>
            <input
              className="h-9 border border-slate-300 px-2 w-full rounded"
              type="email"
              value={email}
              placeholder="Введіть пошту"
              onChange={(e) => setEmail(e.target.value)}
              id="email-input"
            />
          </span>
          <span className="flex flex-col gap-0.5">
            <label htmlFor="password-input" className="text-base sm:text-lg">
              Пароль
            </label>
            <input
              className="h-9 border border-slate-300 px-2 w-full rounded"
              type="password"
              value={password}
              placeholder="Введіть пароль"
              id="password-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
          <span className="flex flex-col gap-0.5">
            <label
              htmlFor="repeat-password-input"
              className="text-base sm:text-lg"
            >
              Повторіть Пароль
            </label>
            <input
              className="h-9 border border-slate-300 px-2 w-full rounded"
              type="password"
              placeholder="Повторіть пароль"
              id="repeat-password-input"
            />
          </span>
          <button
            type="submit"
            disabled={loading}
            className="bg-sky-500 hover:bg-sky-600 transition-all cursor-pointer py-1.5 sm:py-2.5 text-white font-medium rounded w-full"
          >
            {loading ? "Реєстрація..." : "Зареєструватися"}
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

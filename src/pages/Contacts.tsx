import React, { useState, useEffect, FormEvent } from "react";
import InputForm from "../components/InputForm";
import { Mail, MessageCircle, User2Icon } from "lucide-react";
import { sendReview } from "../services/ReviewService";
import { showToast } from "../components/ToastNotification";
import { ToastContainer } from "react-toastify";
const Contacts = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const isFormValid = userName.trim() !== "" && email.trim() !== "" && theme.trim() !== "" && message.trim() !== "";

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = sendReview({ userName, email, theme, message });
      setUserName("");
      setEmail("");
      setTheme("");
      setMessage("");
      showToast("Відгук успішно надіслано", "success");
      return data;
    } catch (error) {
      console.log(error);
      showToast("Не вдалося надіслати відгук", "error");
    }
  };

  return (
    <section className="flex w-full h-full items-center justify-center">
      <form onSubmit={handleSubmitReview} className="border border-slate-100 rounded-xl shadow-2xl flex flex-col gap-3">
        <span className="text-center p-5 rounded-t-xl bg-gradient-to-r from-sky-50 to-sky-100">
          <h2 className="text-2xl text-sky-500 font-bold">Звяжіться з нами</h2>
          <p className="text-gray-600">Ми цінуємо вашу думку і будемо раді почути ваш відгук!</p>
        </span>
        <div className="px-5 py-3 flex flex-col gap-4">
          <InputForm
            icon={<User2Icon size={17} />}
            label="Ваше ім`я"
            placeholder="Введіть ваше повне ім`я"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <InputForm
            icon={<Mail size={17} />}
            label="Електронна пошта"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputForm
            icon={<MessageCircle size={17} />}
            label="Тема"
            placeholder="Про шо ви хочете повідомити"
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value);
            }}
          />
          <span className="flex w-full flex-col ">
            <label htmlFor="message" className="text-lg">
              Повідомлення
            </label>
            <textarea
              id="message"
              value={message}
              className="border p-1.5 resize-none h-28 border-slate-400 rounded focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all"
              placeholder="Введіть ваше повідомлення тут..."
              onChange={(e) => setMessage(e.target.value)}
            />
          </span>
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full disabled:bg-sky-300 cursor-pointer disabled:cursor-not-allowed bg-sky-500 text-white font-bold py-2 rounded"
          >
            Надіслати відгук
          </button>
          <p className="text-sm text-gray-600">Ваші відгуки допомагають нам стати кращими.</p>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Contacts;

import React, { useState } from "react";
import InputForm from "../components/InputForm";
import { Mail, MapPinHouse, MessageCircle, Phone, User2Icon } from "lucide-react";
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
    <section className="w-full flex flex-col md:flex-row justify-between items-start gap-10 p-6 md:p-12 max-w-7xl mx-auto">
      {/* Контактна інформація */}
      <div className="flex flex-col gap-6 w-full md:w-1/2">
        <h2 className="font-bold text-2xl text-center md:text-left">Контактна інформація</h2>
        <ul className="flex flex-col gap-5">
          <li className="flex gap-3 items-start">
            <span className="p-2 bg-blue-50 rounded">
              <Phone color="#3b38ff" />
            </span>
            <div>
              <h3 className="font-medium">Телефон</h3>
              <div className="flex flex-col text-sm text-gray-600">
                <a href="tel:+38099219192">+38099219192</a>
                <a href="tel:+38050432221">+38050432221</a>
              </div>
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <span className="p-2 bg-blue-50 rounded">
              <Mail color="#3b38ff" />
            </span>
            <div>
              <h3 className="font-medium">Пошта</h3>
              <div className="flex flex-col text-sm text-gray-600">
                <a href="mailto:info-courtly@gmail.com">info-courtly@gmail.com</a>
                <a href="mailto:courtly-healp@gmail.com">courtly-healp@gmail.com</a>
              </div>
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <span className="p-2 bg-blue-50 rounded">
              <MapPinHouse color="#3b38ff" />
            </span>
            <div>
              <h3 className="font-medium">Адреса</h3>
              <p className="text-sm text-gray-600">Ужгород, вул. Загорська, 32</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Форма зворотного зв'язку */}
      <form
        onSubmit={handleSubmitReview}
        className="w-full md:w-1/2 border border-slate-100 rounded-xl shadow-2xl flex flex-col gap-3"
      >
        <span className="text-center p-5 rounded-t-xl bg-gradient-to-r from-sky-50 to-sky-100">
          <h2 className="text-2xl text-sky-500 font-bold">Зв’яжіться з нами</h2>
          <p className="text-gray-600">Ми цінуємо вашу думку і будемо раді почути ваш відгук!</p>
        </span>
        <div className="px-5 py-3 flex flex-col gap-4">
          <InputForm
            icon={<User2Icon size={17} />}
            label="Ваше ім’я"
            placeholder="Введіть ваше повне ім’я"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputForm
            icon={<Mail size={17} />}
            label="Електронна пошта"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputForm
            icon={<MessageCircle size={17} />}
            label="Тема"
            placeholder="Про що ви хочете повідомити"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
          <span className="flex w-full flex-col">
            <label htmlFor="message" className="text-lg">Повідомлення</label>
            <textarea
              id="message"
              value={message}
              className="border p-2 resize-none h-28 border-slate-400 rounded focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all"
              placeholder="Введіть ваше повідомлення тут..."
              onChange={(e) => setMessage(e.target.value)}
            />
          </span>
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full disabled:bg-sky-300 disabled:cursor-not-allowed bg-sky-500 text-white font-bold py-2 rounded transition-all"
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

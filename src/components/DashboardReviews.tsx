import { useState, useEffect, FormEvent } from "react";
import { getAllReviews, deleteReview, updateReview } from "../services/ReviewService";
import DashboardTable from "./DashboardTable";
import { showToast } from "./ToastNotification";
import { ToastContainer } from "react-toastify";
import ModalView from "./ModalView";
import { createPortal } from "react-dom";
import InputForm from "./InputForm";
import useDebounce from "../hooks/useDebounce"; // Не забудь додати, якщо ще не використовується
import { Search } from "lucide-react";

type Review = {
  _id: string;
  userName: string;
  email: string;
  theme: string;
  message: string;
};

const columns = [
  { key: "_id", label: "ID" },
  { key: "userName", label: "Імя користувача" },
  { key: "email", label: "Ел.пошта" },
  { key: "theme", label: "Тема" },
  { key: "message", label: "Повідомлення" },
];

const DashboardReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reviewToUpdate, setReviewToUpdate] = useState<Review>();
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [reloadReviews, setReloadReviews] = useState<boolean>(false);

  useEffect(() => {
    const getReviews = async () => {
      const data = await getAllReviews();
      setReviews(data);
    };

    getReviews();
  }, [reloadReviews]);

  useEffect(() => {
    const filtered = reviews.filter(
      (r) =>
        r.userName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        r.theme.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        r.message.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredReviews(filtered);
  }, [debouncedSearchTerm, reviews]);

  const handleDeleteReview = async (id: string) => {
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((item) => item._id !== id));
      showToast("Успішно видалений відгук", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditRerview = async (review: Review) => {
    setIsModalOpen(true);
    setReviewToUpdate(review);
    setSelectedName(review.userName);
    setSelectedEmail(review.email);
    setSelectedTheme(review.theme);
    setSelectedMessage(review.message);
  };

  const handleUpdateReview = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updated = {
        userName: selectedName,
        email: selectedEmail,
        theme: selectedTheme,
        message: selectedMessage,
      };
      const data = await updateReview(reviewToUpdate._id, updated);

      setIsModalOpen(false);
      setReloadReviews((prev) => !prev);

      showToast("Успішно оновлено відгук", "success");
      return data;
    } catch (error) {
      console.log(error);
      showToast("Не вдалося оновити відгук", "error");
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Панель адміністратора: Відгуки</h2>

      {/* Пошуковий інпут */}
      <div className="w-full max-w-md mb-5 flex items-center border border-slate-300 rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
        <span className="px-3 text-slate-400">
          <Search size={20} />
        </span>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Пошук за ім’ям, темою або email..."
          className="w-full py-2 pr-4 bg-transparent focus:outline-none"
        />
      </div>

      <DashboardTable
        data={filteredReviews}
        columns={columns}
        onDelete={handleDeleteReview}
        onEdit={handleEditRerview}
      />

      {isModalOpen &&
        createPortal(
          <ModalView onClose={() => setIsModalOpen(false)}>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">Редагувати Відгук {reviewToUpdate?._id}</h3>
              <form onSubmit={handleUpdateReview} className="flex flex-col gap-2">
                <InputForm
                  label="Ім'я користувача"
                  value={selectedName}
                  placeholder="Наприклад Еней"
                  onChange={(e) => {
                    setSelectedName(e.target.value);
                  }}
                />
                <InputForm
                  label="Ел.пошта користувача"
                  value={selectedEmail}
                  placeholder="example@gmail.com"
                  onChange={(e) => {
                    setSelectedEmail(e.target.value);
                  }}
                />
                <InputForm
                  label="Тема листа"
                  placeholder="Наприклад Скарга"
                  value={selectedTheme}
                  onChange={(e) => {
                    setSelectedTheme(e.target.value);
                  }}
                />
                <span className="flex flex-col">
                  <label htmlFor="message">Відгук</label>
                  <textarea
                    className="resize-none border border-slate-400 rounded focus:outline-none focus:ring-1 focus:ring-sky-500"
                    id="message"
                    value={selectedMessage}
                    onChange={(e) => setSelectedMessage(e.target.value)}
                  ></textarea>
                </span>
                <button
                  type="submit"
                  className="bg-yellow-400 text-white hover:bg-yellow-500 font-bold rounded w-full py-1.5 cursor-pointer"
                >
                  Редагувати
                </button>
              </form>
            </div>
          </ModalView>,
          document.body
        )}
      <ToastContainer />
    </section>
  );
};

export default DashboardReviews;

import React, { useState, useEffect } from "react";
import { Court } from "../type";
import { fetchCourts } from "../services/CourtsService";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourtCard from "../components/CourtCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const [courts, setCourts] = useState<Court[] | null>(null);
  const [football, setFootbal] = useState<Court[] | null>(null);
  const [basketball, setBasketball] = useState<Court[] | null>(null);
  const [tennis, setTennis] = useState<Court[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCourts = async () => {
      const data = await fetchCourts();
      const football = data.filter((court) => court.type.name == "Футбол");
      const basketball = data.filter((court) => court.type.name == "Баскетбол");
      const tennis = data.filter((court) => court.type.name == "Теніс");
      setCourts(data.slice(0, 10));
      setFootbal(football);
      setBasketball(basketball);
      setTennis(tennis);
    };
    getCourts();
  }, []);

  console.log(football);

  return (
    <main className="">
      <section className=" bg-sky-500 mt-10 rounded-xl h-[500px] w-full flex items-center justify-center flex-col gap-10">
        <span className="w-full flex flex-col gap-3">
          <h1 className="text-white text-5xl font-bold text-center">
            Бронюйте спортивні майданчики <br /> онлайн
          </h1>
          <h3 className="text-white text-xl text-center font-medium">Зручний пошук та миттєве бронювання спортивних майданчиків у вашому місті</h3>
        </span>
        <button
          onClick={() => navigate("/courts")}
          className="text-xl text-sky-500 bg-white cursor-pointer transition hover:scale-110 font-bold rounded py-3 px-2"
        >
          Перейти до майданчиків
        </button>
      </section>
      <section className="w-full flex flex-col gap-8 mt-10 items-center justify-center">
        <span className="w-full text-center">
          <h1 className="text-3xl font-bold pb-2.5">Види спорту</h1>
          <p>
            Бронюйте майданчики для будь-якого виду спорту, від футболу до тенісу,
            <br /> в будь-якому районі міста
          </p>
        </span>
        <ul className="flex w-full flex-wrap gap-4 items-center justify-center">
          <li className="relative">
            <img className="w-96 hover:scale-105 transition h-52 object-cover rounded-xl" src="../../public/football.jpg" alt="football" />
            <span className="absolute bottom-3 left-10 text-white">
              <h1 className="font-bold text-white text-3xl">Футбол</h1>
              <p className="text-lg">{football?.length} майданчики</p>
            </span>
          </li>
          <li className="relative">
            <img className="w-96 hover:scale-105 transition h-52 object-cover rounded-xl" src="../../public/basketball.jpg" alt="football" />
            <span className="absolute bottom-3 left-10 text-white">
              <h1 className="font-bold text-white text-3xl">Баскетбол</h1>
              <p className="text-lg">{basketball?.length} майданчики</p>
            </span>
          </li>
          <li className="relative">
            <img className="w-96 hover:scale-105 transition h-52 object-cover rounded-xl" src="../../public/tennis.jpg" alt="football" />
            <span className="absolute bottom-3 left-10 text-white">
              <h1 className="font-bold text-white text-3xl">Теніс</h1>
              <p className="text-lg">{tennis?.length} майданчики</p>
            </span>
          </li>
        </ul>
        <p onClick={() => navigate("/courts")} className="text-lg mb-2 flex hover:underline cursor-pointer items-center text-sky-500 font-bold">
          Переглянути інші майданчики <ChevronRight />
        </p>
      </section>
      <section className="flex bg-slate-50 rounded-xl px-10 py-5 flex-col items-center gap-10 justify-center">
        <h2 className="text-3xl font-bold">Про наш сервіс</h2>
        <p className="text-lg">
          Наша платформа — це зручний та сучасний сервіс для бронювання спортивних майданчиків по всій Україні. Ми об'єднали всі найкращі спортивні
          локації в одному місці, щоб ви могли легко знайти та забронювати ідеальний майданчик для вашого виду спорту.
        </p>
        <p className="font-medium text-xl">Завдяки нашому сервісу ви можете:</p>
        <ul className="list-disc text-lg">
          <li>Швидко знаходити доступні майданчики поруч з вами</li>
          <li>Порівнювати ціни та умови різних спортивних закладів</li>
          <li>Бронювати час онлайн без дзвінків та зайвих питань</li>
        </ul>
        <p className="text-lg">
          Ми постійно розширюємо нашу мережу партнерів, щоб запропонувати вам ще більше варіантів для занять спортом. Наша мета — зробити спорт
          доступнішим та організованішим для кожного.
          Якщо в вас виникли якісь питання, ви можете <Link className="text-sky-500 hover:underline" to="/contacts"> звя`затись з нами</Link>
        </p>
      </section>
      <section className="w-full flex flex-col gap-8 mt-10 items-center justify-center relative">
        <h2 className="text-3xl font-bold">Наші майданчики</h2>

        <Swiper
          className="w-full"
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {courts?.slice(0, 5).map((court) => (
            <SwiperSlide key={court._id}>
              <div className="flex justify-center p-4 items-center h-full">
                <CourtCard court={court} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="swiper-button-prev-custom cursor-pointer absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-sky-100 z-10">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="swiper-button-next-custom cursor-pointer absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-sky-100 z-10">
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>
    </main>
  );
};

export default Main;

import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-3 items-center justify-center h-full w-full">
      <h1 className="text-9xl text-center opacity-40 p-5 font-bold text-sky-600">404</h1>
      <button onClick={() => navigate("/")} className="text-center text-sky-700 hover:underline cursor-pointer text-3xl">
        Повернутись на головну
      </button>
    </section>
  );
};

export default NotFoundPage;

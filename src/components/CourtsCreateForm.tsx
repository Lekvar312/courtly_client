import { createCourt } from "../services/CourtsService";
import { Court } from "../type";
import InputForm from "./InputForm";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "./ToastNotification";

type CourtsActionFormProps = {
  types: Type[];
  onCreate: (newCourt: Court) => void;
};

type Type = {
  _id: string;
  name: string;
};

type FormData = {
  name: string;
  price: string;
  address: string;
  type: string;
  workingHours: {
    startTime: string;
    endTime: string;
  };
  picture: File | null;
};


const CourtsCreateForm: React.FC<CourtsActionFormProps> = ({ types, onCreate }) => {
const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
} = useForm<FormData>();

  const [selectedType, setSelectedType] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      const newCourt = await createCourt(data);
      onCreate(newCourt.court);
      showToast("Майданчик успішно створено", "success");
    } catch (error) {
      console.log("Помилка при створенні майданчика:", error);
      showToast("Помилка при створенні майданчика", "error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("picture", file); // вручну встановити файл у react-hook-form
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <h1 className="text-lg font-bold">Створити Майданчик</h1>
      <div className="flex flex-col gap-2">
        <InputForm
          placeholder="Введіть назву"
          label="Назва майданчика"
          {...register("name", { required: "Це обовязкове поле", maxLength: { value: 50, message: "Максимальна довжина назви - 50 символів" } })}
          error={errors.name?.message}
        />
        <InputForm
          placeholder="Введіть Адресу"
          label="Адреса майданчика"
          {...register("address", { required: "Це обовязкове поле" })}
          error={errors.address?.message}
        />
        <InputForm
          placeholder="Введіть Ціну за годину"
          label="Ціна майданчика"
          type="number"
          {...register("price", { required: "Це обовязкове поле" })}
          error={errors.price?.message}
        />
        <span className="flex flex-col">
          <label className="font-medium">Тип майданчика</label>
          <select
            className="border border-slate-400 rounded p-1.5 text-base focus:ring-1 focus:ring-purple-800 focus:outline-none transition-all"
            value={selectedType}
            {...register("type")}
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
          >
            {types.map((type) => (
              <option key={type._id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </span>
        <span className="flex w-full justify-between gap-2">
          <InputForm
            placeholder="Час відкриття "
            label="Час відкриття"
            type="time"
            {...register("workingHours.startTime", { required: "Це обовязкове поле" })}
            error={errors.workingHours?.startTime?.message}
          />
          <InputForm
            placeholder="Час закриття "
            label="Час закриття"
            type="time"
            {...register("workingHours.endTime", { required: "Це обовязкове поле" })}
            error={errors.workingHours?.endTime?.message}
          />
        </span>
        <input
  type="file"
  id="courtImage"
  accept="image/*"
  onChange={handleFileChange}
/>

        <label
          htmlFor="courtImage"
          className={`w-full h-40 border flex items-center justify-center border-dashed rounded  ${
            preview ? "border-green-500 border-solid" : "border-black"
          }`}
        >
          {preview ? (
            <img src={preview} alt="uplodaImage" className="w-full h-full p-1 rounded-xl object-cover" />
          ) : (
            <p className="text-black">
              Оберіть файл з розширенням: <br />
              <span className="text-sm"> JPEG, PNG, JPG, PNG</span>
            </p>
          )}
        </label>
        {/* <InputForm type="file" label="Зображення" placeholder="Оберіть зображення" {...register("picture")} onChange={handleFileChange} /> */}
      </div>
      <button className="bg-green-500 py-2 rounded text-white cursor-pointer hover:bg-green-600 font-medium transition-all">Створити</button>
    </form>
  );
};

export default CourtsCreateForm;

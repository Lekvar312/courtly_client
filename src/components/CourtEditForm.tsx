import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "./InputForm";
import { editCourt } from "../services/CourtsService";

type Props = {
  types: Type[];
  selectedCourt: SelectedCourt;
  onUpdate: (updateCourt: SelectedCourt) => void;
  closeModal: () => void;
};

type Type = {
  _id: string;
  name: string;
};

type SelectedCourt = {
  _id?: string;
  name: string;
  price: string;
  address: string;
  type: {
    _id: string;
    name: string;
  };
  workingHours: {
    startTime: string;
    endTime: string;
  };
  picture: File | string | null;
};

const CourtEditForm: React.FC<Props> = ({ selectedCourt, closeModal, types, onUpdate }) => {
  const { register, handleSubmit, setValue, watch } = useForm<SelectedCourt>({
    defaultValues: selectedCourt,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const onSubmit = async (data: SelectedCourt) => {
    console.log(data);
    if (!selectedCourt._id) return <p>Такого майданчика не існує</p>;
    try {
      const updatedCourt = await editCourt(selectedCourt._id, data);
      onUpdate(updatedCourt.court);

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const watchPicture = watch("picture");
  useEffect(() => {
    if (watchPicture instanceof FileList && watchPicture.length > 0) {
      const file = watchPicture[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else if (typeof selectedCourt.picture === "string") {
      setPreview(`${import.meta.env.VITE_BASE_URL}${selectedCourt.picture}`);
    }
  }, [watchPicture, selectedCourt.picture]);

  useEffect(() => {
    setValue("type.name", selectedCourt.type?.name);
  }, [selectedCourt, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <h1 className="text-xl font-bold">Редагування</h1>
      <InputForm placeholder="Введіть назву" label="Назва" {...register("name")} />
      <InputForm placeholder="Введіть адресу" label="Адреса" {...register("address")} />
      <InputForm placeholder="Введіть ціну" type="number" label="Ціна" {...register("price")} />
      <span className="flex flex-col">
        <label className="font-medium">Тип майданчика</label>
        <select
          className="border border-slate-400 rounded p-1.5 text-base focus:ring-1 focus:ring-purple-800 focus:outline-none transition-all"
          {...register("type.name")}
        >
          {types.map((type) => (
            <option key={type._id} value={type?.name}>
              {type.name}
            </option>
          ))}
        </select>
      </span>
      <span className="flex w-full gap-2">
        <InputForm placeholder="Час відкриття" type="time" label="Відкриття" {...register("workingHours.startTime")} />
        <InputForm placeholder="Час Закриття" type="time" label="Закриття" {...register("workingHours.endTime")} />
      </span>

      {/* <InputForm type="file" placeholder="" label="Зображення" {...register("picture")} /> */}
      <input type="file" id="courtImage" accept="image/*" {...register("picture")} className="hidden" />
      <label
        htmlFor="courtImage"
        className={`w-full h-40 border flex items-center justify-center border-dashed rounded  ${
          preview ? "border-green-500 border-solid" : "border-black"
        }`}
      >
        {preview ? (
          <img
            src={preview ? preview : `${import.meta.env.VITE_BASE_URL}` + selectedCourt.picture}
            alt="uploadImage"
            className="w-full h-full p-1 rounded-xl object-cover"
          />
        ) : (
          <p className="text-black">
            Оберіть файл з розширенням: <br />
            <span className="text-sm"> JPEG, PNG, JPG</span>
          </p>
        )}
      </label>

      <span className="flex w-full">
        <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 transition-all cursor-pointer w-full rounded text-white p-1.5">
          Редагувати
        </button>
      </span>
    </form>
  );
};

export default CourtEditForm;

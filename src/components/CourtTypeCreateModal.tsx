import React from "react";
import { useForm } from "react-hook-form";
import InputForm from "./InputForm";
type CreateCourtType = {
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isEditing: boolean;
};

type FormState = {
  typeName: string;
};

const CourtTypeCreateModal: React.FC<CreateCourtType> = ({ onSubmit, isEditing, onChange, value }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <h1 className="text-lg font-bold">{isEditing ? "Редагувати" : "Створити новий тип майданчик"}</h1>
      <InputForm
        value={value}
        label="Назва типу"
        placeholder="Введіть назву"
        {...register("typeName", { required: "Це поле обовязкове для заповнненя" })}
        onChange={onChange}
        error={errors.typeName?.message}
      />
      <button
        type="submit"
        className={`text-base p-1.5 transition-all  font-medium cursor-pointer ${
          isEditing && "bg-yellow-400 hover:bg-yellow-500"
        } bg-green-500 hover:bg-green-600 text-white rounded`}
      >
        {isEditing ? "Редагувати" : "Створити"}
      </button>
    </form>
  );
};

export default CourtTypeCreateModal;

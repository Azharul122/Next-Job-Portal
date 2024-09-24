"use client";
import { FC } from "react";
import { useFormStatus } from "react-dom";

interface Props {
  label: string;
}

const AuthSubmitButton: FC<Props> = ({ label }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      style={{ opacity: pending ? 0.5 : 1 }}
      disabled={pending}
      className="flex items-center justify-center w-full text-center bg-white text-black rounded-small p-2 cursor-pointer"
    >
      {pending && (
        <div className="border-gray-300 h-4 w-4 animate-spin rounded-full border-2 border-t-black mr-2" />
      )}
      {label}
    </button>
  );
};

export default AuthSubmitButton;

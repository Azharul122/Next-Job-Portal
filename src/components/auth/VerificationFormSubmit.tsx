"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";

interface Props {}

const VerificationFormSubmit: FC<Props> = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="font-semibold underline"
    >
      {pending ? "Please wait..." : "Click Here"}
    </button>
  );
};

export default VerificationFormSubmit;

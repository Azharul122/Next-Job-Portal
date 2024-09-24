"use client";

import { FC } from "react";
import VerificationFormSubmit from "./VerificationFormSubmit";
import { useFormState } from "react-dom";
import { generateVerificationLink } from "@/actions/auth";
// import { generateVerificationLink } from "../actions/auth";

interface Props {
  visible?: boolean;
}
const message = "Please check your inbox to verify your email.";
const VerificationStatus: FC<Props> = ({ visible }) => {
  const [state, action] = useFormState(generateVerificationLink, {});
  if (!visible) return null;

  if (state.success) {
    return (
      <div className="text-center p-2">
        <p>Please check your inbox.</p>
      </div>
    );
  }

  return (
    <form action={action} className="text-center p-2">
      <span>{message}</span>
      <div className="text-center">
        {"Didn't get link "}
        <VerificationFormSubmit />
      </div>
    </form>
  );
};

export default VerificationStatus;

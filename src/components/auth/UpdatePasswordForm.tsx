"use client";

import { FC } from "react";
import { useFormState } from "react-dom";
import AuthSubmitButton from "./AuthSubmitButton";
import { updatePassword } from "@/actions/auth";
import { Input } from "../ui/input";

interface Props {
  token: string;
  userId: string;
}

const UpdatePasswordForm: FC<Props> = ({ userId, token }) => {
  const [state, action] = useFormState(updatePassword, {});
  const { error, success } = state;
  return (
    <div className="space-y-6 max-w-96 mx-auto pt-20 sm:p-0 p-4">
      <div>
        {success ? (
          <p className="text-green-500">Password Updated SuccessFully.</p>
        ) : null}
      </div>
      <div>{error ? <p className="text-red-500">{error}</p> : null}</div>
      <form action={action} className="space-y-4">
        <h1 className="text-2xl">Update Password</h1>
        <input name="token" value={token} hidden />
        <input name="userId" value={userId} hidden />
        <Input
          name="one"
          type="password"
          placeholder="********"
          label="Password"
        />
        <Input
          name="two"
          type="password"
          placeholder="********"
          label="Confirm Password"
        />
        <AuthSubmitButton label="Update Password" />
      </form>
    </div>
  );
};

export default UpdatePasswordForm;

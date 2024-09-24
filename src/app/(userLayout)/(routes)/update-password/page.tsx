
import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";
import startDb from "@/lib/connectToDB";
import PassResetTokenModel from "@/model/passwordResetToken";
import { notFound } from "next/navigation";
import { FC } from "react";

interface Props {
  searchParams: {
    token: string;
    userId: string;
  };
}

const UpdatePassword: FC<Props> = async ({ searchParams }) => {
  const { token, userId } = searchParams;

  try {
    await startDb();
    const resetToken = await PassResetTokenModel.findOne({ userId });
    if (!resetToken?.compare(token)) {
      throw new Error();
    }
  } catch (error) {
    return notFound();
  }

  return <UpdatePasswordForm token={token} userId={userId} />;
};

export default UpdatePassword;

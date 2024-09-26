"use server";
import { z } from "zod";
import crypto from "crypto";

import { auth, signIn, unstable_update } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
// import mail from "@/app/utils/mail";
import streamifier from "streamifier";
import cloud from "../lib/cloud";
import { uploadFileToCloud } from "../utils/fileHandler";
import startDb from "@/lib/connectToDB";
import VerificationTokenModel from "@/model/verificationToken";
import mail from "@/utils/mail";
import UserModel, { createNewUser } from "@/model/user.model";
import {
  passwordValidationSchema,
  signInSchema,
} from "@/utils/verificationSchema";
import PassResetTokenModel from "@/model/passwordResetToken";
import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
// import PassResetTokenModel from "../models/passwordResetToken";

export const continueWithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};

const handleVerificationToken = async (user: {
  id: string;
  name: string;
  email: string;
}) => {
  const userId = user.id;
  const token = crypto.randomBytes(36).toString("hex");
  //   randomToken = 1234hgh = db (hash)

  await startDb();
  await VerificationTokenModel.findOneAndDelete({ userId });
  await VerificationTokenModel.create({ token, userId });
  const link = `${process.env.VERIFICATION_LINK}?token=${token}&userId=${userId}`;
  await mail.sendVerificationMail({ link, name: user.name, to: user.email });
};

const signUpSchema = z.object({
  name: z.string().trim().min(3, "Invalid name!"),
  email: z.string().email("Invalid email!"),

  password: z.string().min(8, "Password is too short!"),
});

interface AuthResponse {
  success?: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
}

export const signUp = async (
  state: AuthResponse,
  data: FormData
): Promise<AuthResponse> => {
  const result = signUpSchema.safeParse({
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  });
  if (!result.success) {
    // Show error to the users
    return { success: false, errors: result.error.formErrors.fieldErrors };
  }

  const { email, name, password } = result.data;

  await startDb();
  const oldUser = await UserModel.findOne({ email });
  if (oldUser) return { success: false, error: "User already exists!" };

  const user = await createNewUser({
    name,
    email,

    password,
    provider: "credentials",
    verified: false,
  });

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
  // revalidatePath("/");

  // send verification email
  // await handleVerificationToken({ email, id: user._id, name });
  // await auth()

  // if(useOk && useOk.ok){

  // }

  // // redirect("/")
  // if (usersignIn && usersignIn.ok) {
  //   // Redirect to home
  //   redirect("/");
  // }
  // redirect("/")
  return { success: true };
};

export const continueWithCredentials = async (
  state: AuthResponse,
  data: FormData
): Promise<AuthResponse> => {
  try {
    const result = signInSchema.safeParse({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (!result.success)
      return { success: false, errors: result.error.formErrors.fieldErrors };

    const { email, password } = result.data;

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    return { success: true };
  } catch (error) {
    let errorMsg = "";
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      redirect("/");
    } else if (error instanceof AuthError) {
      errorMsg = error.message;
    } else {
      errorMsg = (error as any).message;
    }
    return { error: errorMsg, success: false };
  }
};

interface VerificationResponse {
  success?: boolean;
}
export const generateVerificationLink = async (
  state: VerificationResponse
): Promise<VerificationResponse> => {
  const session = await auth();
  if (!session) return { success: false };

  const user = await UserModel.findById(session.user.id);
  if (user?.verified) {
    // user is already verified
    return { success: false };
  }

  const { email, id, name } = session.user;
  await handleVerificationToken({ email, id, name });
  return { success: true };
};

export const updateProfileInfo = async (data: FormData) => {
  const session = await auth();
  if (!session) return;

  const userInfo: { name?: string; avatar?: { id: string; url: string } } = {};

  const name = data.get("name");
  const avatar = data.get("avatar");
  if (typeof name === "string" && name.trim().length >= 3) {
    userInfo.name = name;
  }

  if (avatar instanceof File && avatar.type.startsWith("image")) {
    const result = await uploadFileToCloud(avatar);
    if (result) {
      userInfo.avatar = { id: result.public_id, url: result.secure_url };
    }

    // const arrayBuffer = await avatar.arrayBuffer()
    // const buffer: Buffer = Buffer.from(arrayBuffer)

    // const stream = cloud.uploader.upload_stream({}, (err, result) => {
    //   if(err) throw err
    //   else

    // })

    // streamifier.createReadStream(buffer).pipe(stream)
  }

  await startDb();
  await UserModel.findByIdAndUpdate(session.user.id, {
    ...userInfo,
  });
  await unstable_update({
    user: {
      ...session.user,
      name: userInfo.name,
      avatar: userInfo.avatar?.url,
    },
  });
};

interface ResetPassResponse {
  message?: string;
  error?: string;
}

export const generatePassResetLink = async (
  state: ResetPassResponse,
  data: FormData
): Promise<ResetPassResponse> => {
  const email = data.get("email");
  if (typeof email !== "string") return { error: "Invalid email!" };

  const message = "If we found your profile we will sent you the link!";
  await startDb();
  const user = await UserModel.findOne({ email, provider: "credentials" });
  if (!user) return { message };

  const userId = user._id;
  const token = crypto.randomBytes(36).toString("hex");

  await PassResetTokenModel.findOneAndDelete({ userId });
  await PassResetTokenModel.create({ token, userId });
  const link = `${process.env.PASS_RESET_LINK}?token=${token}&userId=${userId}`;
  await mail.sendPassResetMail({ link, name: user.name, to: user.email });

  return { message };
};

export const updatePassword = async (
  state: AuthResponse,
  data: FormData
): Promise<AuthResponse> => {
  const fields = ["one", "two", "token", "userId"];
  const incomingData: Record<string, any> = {};
  for (const field of fields) {
    incomingData[field] = data.get(field);
  }

  const result = passwordValidationSchema.safeParse(incomingData);
  if (!result.success) return { success: false, error: "Invalid Password!" };

  const { userId, token, one } = result.data;
  await startDb();
  const resetToken = await PassResetTokenModel.findOne({ userId });
  if (!resetToken?.compare(token)) {
    return { success: false, error: "Invalid request!" };
  }

  const user = await UserModel.findById(userId);
  if (!user)
    return {
      success: false,
      error: "Could not update password, user not found!",
    };

  user.password = one;
  await user.save();

  await PassResetTokenModel.findByIdAndDelete(resetToken._id);
  return { success: true };
};

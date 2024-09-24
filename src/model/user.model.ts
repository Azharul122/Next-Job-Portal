import { Model, model, models, ObjectId, Schema } from "mongoose";
import { hashSync, compareSync, genSaltSync } from "bcrypt";

interface BaseUserDoc {
  _id?: ObjectId;
  name: string;
  email: string;
  provider: "credentials" | "google";
  password?: string;
  avatar?: {
    id?: string;
    url: string;
  };
  verified: boolean;
}

export interface CredentialsUserDoc extends BaseUserDoc {
  provider: "credentials";
  password: string;
}

export interface GoogleUserDoc extends BaseUserDoc {
  provider: "google";
  password?: never;
}

export type UserDoc = CredentialsUserDoc | GoogleUserDoc;

interface Methods {
  compare(password: string): boolean;
}

const schema = new Schema<BaseUserDoc, {}, Methods>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: String,
    avatar: {
      type: Object,
      url: String,
      id: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      enum: ["google", "credentials"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function () {
  if (
    this.isModified("password") &&
    this.password &&
    this.provider === "credentials"
  ) {
    const salt = genSaltSync(10);
    this.password = hashSync(this.password, salt);
  }
});

schema.methods.compare = function (password) {
  if (this.password) return compareSync(password, this.password);
  return false;
};

export const createNewUser = async (userInfo: UserDoc) => {
  return await UserModel.create(userInfo);
};

const UserModel = models.User || model("User", schema);
export default UserModel as Model<BaseUserDoc, {}, Methods>;

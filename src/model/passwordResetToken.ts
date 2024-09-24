import { Model, model, models, ObjectId, Schema } from "mongoose";
import { hashSync, compareSync, genSaltSync } from "bcrypt";

interface PassResetTokenDoc {
  token: string;
  userId: string;
  expires: Date;
}

interface Methods {
  compare(token: string): boolean;
}

const schema = new Schema<PassResetTokenDoc, {}, Methods>({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    default: Date.now(),
    expires: 60 * 60,
  },
});

schema.pre("save", function () {
  if (this.isModified("token")) {
    const salt = genSaltSync(10);
    this.token = hashSync(this.token, salt);
  }
});

schema.methods.compare = function (token) {
  return compareSync(token, this.token);
};

const PassResetTokenModel =
  models.PassResetToken || model("PassResetToken", schema);
export default PassResetTokenModel as Model<PassResetTokenDoc, {}, Methods>;

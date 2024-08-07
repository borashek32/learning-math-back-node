import { Schema, model } from "mongoose";
import { IRole } from "./Role";

const roleSchema = new Schema<IRole>({
  value: { default: 'USER', type: String, unique: true },
});

const Role = model<IRole>('Role', roleSchema);

export default Role;

"use server";

import { collectionNamesObj, dbConnect } from "@/lib/bdConnect";
import bcrypt from "bcrypt";

const registerUser = async (payload) => {
  // ✅ MUST await this line
  const userCollection = await dbConnect(collectionNamesObj.user);

  const { email, password } = payload;
  if (!email || !password) return { error: "Email & password required" };

  const existingUser = await userCollection.findOne({ email });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;

    const result = await userCollection.insertOne(payload);
    return {
      success: true,
      userId: result.insertedId.toString(),
    };
  }

  return { error: "User already exists" };
};

export default registerUser;


"use server";

import { collectionNamesObj, dbConnect } from "@/lib/bdConnect"; 
import bcrypt from "bcrypt";

export const loginUser = async (payload) => {

    
  const { email, password } = payload;

  const userCollection = await dbConnect(collectionNamesObj.user); 
  const user = await userCollection.findOne({ email });

console.log(user.password,"find");

  if (!user) return null;

  const isPasswordOK = await bcrypt.compare(password, user?.password); 


  if (!isPasswordOK) return null;

  return user;
};

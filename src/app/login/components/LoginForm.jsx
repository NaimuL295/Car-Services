"use client";
import React from "react";
 import { signIn } from "next-auth/react";
// import { FaGithub } from "react-icons/fa6";
// import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
 import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";


const LoginForm=()=> {
const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    toast("Submitting ....");
 
        
    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      })
        
      if (response.ok) {
        toast.success("Logged In successfully");
      console.log(response);
      
      
        
        router.push("/");
        form.reset();
      } else {
        toast.error("FAILED to Log In");
      }
      //console.log({ email, password });
    } catch (error) {
      console.log(error);
      toast.error("FAILED to Log In");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">

     
 
    <div className="fieldset space-y-4">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Password"
              required
            />
      <div>
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn btn-neutral bg-orange-500 text-white mt-4 w-full"
            >
              Login
            </button>
      </div>
 
      
      <p className="text-center">Or Sign In with</p>
       <SocialLogin />
 

         <p className="text-center text-sm mb-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-orange-500 font-bold">
            Register
          </Link>
        </p>
    </form>
  );
}
export default LoginForm
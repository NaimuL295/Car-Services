"use client";
import React from "react";
import Link from "next/link";
import registerUser from "@/app/actions/auth/registerUser";


 
// import SocialLogin from "@/app/login/components/SocialLogin";
export default function RegisterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const password = form.password.value;
    console.log(name,email,password);
    
    await registerUser({ name, email, password });
  };
  return (

    

     <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
            <label className="form-control w-full">
  <div className="label w-full">
    <span className="label-text font-bold">Name</span>
  </div>
  <input
    type="text"
    placeholder="Type here"
    className="input input-bordered w-full"
    name="name"
    required
  />
</label>

          <fieldset className="fieldset space-y-4">
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

            {/* <div>
              <a className="link link-hover text-sm">Forgot password?</a>
            </div> */}

            <button
              type="submit"
              className="btn btn-neutral bg-orange-500 text-white mt-4 w-full"
            >
              Register
            </button>
          </fieldset>
        </div>

        <p className="text-center text-sm">Or Sign In with</p>
        {/* <SocialLogin /> */}
     <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-500 font-bold">
          Log in
        </Link>



      </p>

     
      </div>
    </form>
  );
  
}
  {/* <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text  font-bold">Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          name="name"
        />
      </label>
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text  font-bold">Email</span>
        </div>
        <input
          type="text"
          name="email"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label w-full">
          <span className="label-text font-bold">Password</span>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label> */}
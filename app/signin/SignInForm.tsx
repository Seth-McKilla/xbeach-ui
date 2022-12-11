"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function SignInForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ email }) => {
    await signIn("email", { email, callbackUrl: "/dashboard" });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            {...register("email", { required: true })}
            placeholder="Email address"
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-700 border border-gray-300 rounded-md appearance-none focus:z-10 focus:border-blue-800 focus:outline-none focus:ring-blue-800 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <input
          className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-md group hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
          type="submit"
        />
      </div>
    </form>
  );
}

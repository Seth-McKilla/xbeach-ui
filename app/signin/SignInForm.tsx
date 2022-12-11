"use client";

const { useState } = require("react");

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function SignInForm() {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const [error, setError] = useState("");

  const onSubmit = async ({ email }) => {
    try {
      const response = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(
          "An error occurred while signing in, please try again later."
        );
      }
    } catch (error: any) {
      return setError(error.data?.error || error.message);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            {...register("email", {
              required: true,
            })}
            type="email"
            placeholder="Email address"
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-700 border border-gray-300 rounded-md appearance-none focus:z-10 focus:border-blue-800 focus:outline-none focus:ring-blue-800 sm:text-sm"
          />
          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
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

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function SignInForm() {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async ({ email }: { email: string }) => {
    setLoading(true);
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

      setSuccess(true);
    } catch (error: any) {
      setError(error.data?.error || error.message);
    }
    return setLoading(false);
  };

  return success ? (
    <div className="flex justify-center mt-2 text-2xl font-bold text-green-600 place-items-center">
      <p>Check your email for a sign in link</p>
    </div>
  ) : (
    <form className="mt-2 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
            className="relative block w-full px-3 py-4 text-gray-900 placeholder-gray-700 border border-gray-300 rounded-md appearance-none focus:z-10 focus:border-blue-800 focus:outline-none focus:ring-blue-800 sm:text-sm"
            disabled={loading}
          />
          {error && <div className="mt-2 text-red-600 text-md">{error}</div>}
        </div>
      </div>

      <div>
        <input
          className={`relative flex justify-center w-full px-4 py-2 text-md font-medium text-white bg-blue-800 border border-transparent rounded-md group hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2`}
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
}

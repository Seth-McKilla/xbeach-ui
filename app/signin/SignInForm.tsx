"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputError from "@/components/InputError";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [networkError, setNetworkError] = useState("");

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
      setNetworkError(error.data?.error || error.message);
    }
    return setLoading(false);
  };

  return success ? (
    <div className="flex justify-center mt-2 text-2xl font-bold text-green-600 place-items-center">
      <p>Check your email for a sign in link</p>
    </div>
  ) : (
    <form className="mt-2 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email", {
          required: "Email is required",
        })}
        placeholder="Email"
        disabled={loading}
      />
      <InputError error={errors?.email?.message || networkError} />

      <Button type="submit" styles="w-full" disabled={loading || success}>
        Submit
      </Button>
    </form>
  );
}

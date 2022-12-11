import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <div className="flex justify-center h-screen px-4 py-12 -mt-20 place-items-center sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          {
            "Don't have an account? No problem, we'll create one for you and email you a link to access your account."
          }
        </p>
        <SignInForm />
      </div>
    </div>
  );
}

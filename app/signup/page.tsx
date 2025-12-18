"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <p className="mt-1 text-sm text-gray-600">
          Start using Vizora in seconds
        </p>

        <form className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white hover:bg-gray-900"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

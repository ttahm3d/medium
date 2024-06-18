import { SigninInput } from "@ttahm3d/medium-blog-ttahm3d-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SignIn() {
  const [signIn, setSignIn] = useState<SigninInput>({
    email: "",
    password: "",
  });

  return (
    <section className="grid grid-cols-2 min-h-screen">
      <div className="h-full w-full flex items-center justify-center">
        <form className="flex flex-col gap-4">
          <h3 className="text-3xl font-bold text-teal-900 text-center">
            Sign In
          </h3>
          <h4 className="text-center -mt-3">
            Don&apos;t have an account?{" "}
            <NavLink
              className="underline underline-offset-2 decoration-teal-900"
              to="/auth/signup">
              Create one
            </NavLink>
          </h4>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-teal-900 focus:border-teal-900 block w-full p-2.5"
              placeholder="john.doe@example.com"
              value={signIn.email}
              onChange={(e) =>
                setSignIn((pSignIn) => ({
                  ...pSignIn,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-teal-900 focus:border-teal-900 block w-full p-2.5"
              value={signIn.password}
              onChange={(e) =>
                setSignIn((pSignIn) => ({
                  ...pSignIn,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex mt-3 gap-4 justify-center">
            <button className="px-6 py-2 rounded-md border text-teal-900 border-teal-900">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-md border bg-teal-900 text-white">
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className="bg-neutral-100 flex items-start px-24 justify-center flex-col  h-full w-full">
        <h2 className="text-3xl font-bold text-neutral-950 max-w-3xl">
          The customer service I received was exceptional. The support team went
          above and beyond to address my concerns
        </h2>
        <h4 className="font-bold text-lg mt-4">Jules Winnfield</h4>
        <p className="text-neutral-500">CEO, ACME Inc</p>
      </div>
    </section>
  );
}

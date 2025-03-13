"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        {/* Signed in as {session.user?.email} <br /> */}
        <button
          className="text-white hover:text-gray-300"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <button className="text-white hover:text-gray-300" onClick={() => signIn()}>
      Sign in
    </button>
  );
}

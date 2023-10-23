"use client";

import React from "react";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();

  const { data: session } = useSession();

  console.log("Dashboard = ", session);

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
  };
  if (session) {
    return (
      <div className=" text-center mt-16">
        <p className="text-4xl font-bold mb-4">Dashboard</p>

        <p className="text-2xl font-bold mb-4">Name - {session?.user?.name}</p>
        <p className="text-2xl font-bold mb-4">
          Email - {session?.user?.email}
        </p>
        <p className="text-2xl font-bold mb-4">
          Phone - {session?.user?.phone}
        </p>
        <p className="text-2xl font-bold mb-4">
          Address - {session?.user?.address}
        </p>

        <button
          className="bg-red-500  hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    return (
      <div className=" text-center mt-16">
        <div className="text-3xl font-bold mb-4">You are not authorised</div>
        <Link
          href="/login"
          className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
    );
  }
};

export default Dashboard;

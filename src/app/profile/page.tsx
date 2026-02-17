'use client'

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserData = async () => {
    try {
      const res = await axios.post("/api/users/me")
      setData(res.data.data._id)
    } catch (error) {
      toast.error("Failed to get user data")
    }
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("logout success")
      router.push("/login")
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔹 Navbar */}
      <nav className="flex items-center justify-between bg-white px-10 py-4 shadow">
        <h1 className="text-2xl font-bold text-blue-600">
          AuthApp
        </h1>

        <button
          onClick={logout}
          className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* 🔹 Main Section */}
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">

        {/* 🔸 Profile Card */}
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">

          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Profile
          </h1>

          <p className="mb-6 text-gray-500">
            Welcome to your profile page
          </p>

          {/* User Data */}
          <div className="mb-6 rounded-md bg-gray-100 p-4">
            <p className="text-sm text-gray-600">User ID</p>

            {data === "nothing" ? (
              <p className="text-gray-500">No data loaded</p>
            ) : (
              <Link
                href={`/profile/${data}`}
                className="break-all font-medium text-blue-600 hover:underline"
              >
                {data}
              </Link>
            )}
          </div>

          {/* Actions */}
          <button
            onClick={getUserData}
            className="mb-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Get User Data
          </button>

          <Link
            href="/"
            className="block w-full rounded-md border py-2 text-gray-700 hover:bg-gray-100"
          >
            Go Home
          </Link>

        </div>
      </div>
    </div>
  )
}

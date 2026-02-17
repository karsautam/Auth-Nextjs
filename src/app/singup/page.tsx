'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function SingupPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisables] = useState(true)
  const [loding, setLoding] = useState(false)

  const onSignup = async () => {
    try {
      setLoding(true)

      const response = await axios.post("/api/users/singup", user)
      console.log("Signup success:", response.data)

      toast.success("Signup successful")
      router.push('/login')

    } catch (error) {
      console.log("Signup failed:", error)
      toast.error("Signup failed")
    } finally {
      setLoding(false)
    }
  }

  useEffect(() => {
    if (
      user.email.trim().length > 0 &&
      user.username.trim().length > 0 &&
      user.password.trim().length > 0
    ) {
      setButtonDisables(false)
    } else {
      setButtonDisables(true)
    }
  }, [user])

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔹 Navbar */}
      <nav className="flex items-center justify-between bg-white px-10 py-4 shadow">
        <h1 className="text-2xl font-bold text-blue-600">
          AuthApp
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Login
          </button>

          <button
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* 🔹 Main Section */}
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">

        {/* 🔸 Auth Card */}
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

          <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
            Sign Up
          </h1>

          <p className="mb-6 text-center text-gray-500">
            Create your account
          </p>

          {/* Username */}
          <label htmlFor="username" className="text-sm text-gray-600">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
            placeholder="Username"
            className="mb-4 w-full rounded-md border px-4 py-2"
          />

          {/* Email */}
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            placeholder="Email"
            className="mb-4 w-full rounded-md border px-4 py-2"
          />

          {/* Password */}
          <label htmlFor="password" className="text-sm text-gray-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            placeholder="Password"
            className="mb-6 w-full rounded-md border px-4 py-2"
          />

          {/* Signup Button */}
          <button
            disabled={buttonDisabled || loding}
            onClick={onSignup}
            className={`mb-4 w-full rounded-md py-2 text-white font-medium
              ${buttonDisabled || loding
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {loding ? "Processing..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => router.push('/login')}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

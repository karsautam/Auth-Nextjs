'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisables] = useState(true)
  const [loding, setLoding] = useState(false)

  const onLogin = async () => {
    try {
      setLoding(true)

      const response = await axios.post("/api/users/login", user)
      console.log("Login success:", response.data)

      toast.success("Login successful")
      router.push('/profile')

    } catch (error) {
      console.log("Login failed:", error)
      toast.error("Login failed")
    } finally {
      setLoding(false)
    }
  }

  useEffect(() => {
    if (
      user.email.trim().length > 0 &&
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

        {/* <div className="space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Login
          </button>

          <button
            onClick={() => router.push('/signup')}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Signup
          </button>
        </div> */}
      </nav>

      {/* 🔹 Main Section */}
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">

        {/* 🔸 Auth Card */}
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

          <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
            Login
          </h1>

          <p className="mb-6 text-center text-gray-500">
            Login to your account
          </p>

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

          {/* Login Button */}
          <button
            disabled={buttonDisabled || loding}
            onClick={onLogin}
            className={`mb-4 w-full rounded-md py-2 text-white font-medium
              ${buttonDisabled || loding
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {loding ? "Processing..." : "Login"}
          </button>

          {/* Redirect */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push('/singup')}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Signup
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

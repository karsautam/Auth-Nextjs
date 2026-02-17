'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyEmailPage() {
  // const router = useRouter()

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token })
      setVerified(true)
      setError(false)
    } catch (err) {
      setError(true)
      setVerified(false)
    } finally {
      setLoading(false)
    }
  }

  // Get token from URL
  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  // Verify email when token exists
  useEffect(() => {
     setError(false)
    if (token.length > 0) {
      verifyEmail()
    }
  }, [token])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-2">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg text-center">

        <h1 className="mb-6 text-4xl font-bold text-gray-800">
          Verify Email
        </h1>

        <h2 className="mb-6 break-all rounded-md bg-orange-500 p-3 text-black">
          {token ? token : "No token"}
        </h2>

        {verified && (
          <div className="mt-4">
            <h2 className="mb-4 text-2xl font-semibold text-green-600">
              Verified ✅
            </h2>

            <link
              href="/login"
              className="inline-block rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >Login
            </link>
          </div>
        )}
        {error && (
          <div>
            <h2>Error</h2>
          </div>
        )}

      </div>
    </div>
  )
}
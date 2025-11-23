"use client"
import React, { useEffect } from "react"
import { useParams } from "next/navigation"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"

const Page = () => {
  const params = useParams()
  const router = useRouter()
  const accessToken = params.tokens[0]
  const refreshToken = params.tokens[1]

  useEffect(() => {
    if (
      accessToken !== null &&
      accessToken !== undefined &&
      refreshToken !== null &&
      accessToken !== undefined
    ) {
      axiosInstance.post("/auth/cookie-setter", {
        accessToken,
        refreshToken,
      })
    }

    router.replace("/")
  }, [accessToken, refreshToken])

  return <div>redirecting...</div>
}

export default Page

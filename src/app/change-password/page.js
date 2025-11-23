"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useAuthStore } from "@/app/store/useAuthStore"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"

export default function ResetPasswordPage() {
  const [token, setToken] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { changePassword, isChangingPassword } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newPassword || !oldPassword) {
      toast.error("Please fill in all fields")
      return
    }

    if (newPassword === oldPassword) {
      toast.error("New password cannot be same as old password")
      return
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }
    setLoading(true)
    changePassword(oldPassword, newPassword)
    // Redirect to login page after successful reset
    //   setTimeout(() => {
    // router.push("/login")
    //   }, 2000)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
          <CardDescription>
            Enter your new password to change your account access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="newPassword">Old Password</FieldLabel>
                <Input
                  id="oldPassword"
                  type="password"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={isChangingPassword}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">New Password</FieldLabel>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
              </Field>
            </FieldGroup>
            <Button
              type="submit"
              className="w-full"
              disabled={isChangingPassword}
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Changing Password...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
          <div className="text-center text-sm mt-4">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

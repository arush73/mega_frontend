"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAuthStore } from "@/app/store/useAuthStore"
import { ArrowLeft } from "lucide-react"

export function ForgotPasswordForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState("")
  const { forgotPassword, isResettingPassword } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    await forgotPassword(email)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={isResettingPassword}>
                  {isResettingPassword ? "Sending Link..." : "Send Reset Link"}
                </Button>
              </Field>
              <div className="text-center text-sm">
                <Link href="/login" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

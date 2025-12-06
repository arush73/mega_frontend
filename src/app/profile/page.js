"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store/useAuthStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Mail, User, Shield, Calendar } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ProfilePage() {
  const {
    user,
    checkUser,
    isCheckingUser,
    changePassword,
    isChangingPassword,
  } = useAuthStore()
  const router = useRouter()

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // useEffect(() => {
  //   checkUser()
  // }, [checkUser])

  // useEffect(() => {
  //   if (!isCheckingUser && !user) {
  //     router.push("/login")
  //   }
  // }, [isCheckingUser, user, router])

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match")
      return
    }

    await changePassword(passwords.current, passwords.new)
    setIsDialogOpen(false)
    setPasswords({ current: "", new: "", confirm: "" })
  }

  if (isCheckingUser) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <Skeleton className="h-32 w-32 rounded-full" />
                </div>
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-48 mx-auto" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // if (!user) return null

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          {/* Left Column: User Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={user?.avatar || ""}
                    alt={user?.username || ""}
                  />
                  <AvatarFallback className="text-4xl">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{user?.username}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Role: {user?.role || "User"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Joined:{" "}
                    {new Date(
                      user?.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Details & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      value={user?.username || ""}
                      readOnly
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={user?.email || ""}
                      readOnly
                      className="pl-8"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your password and security settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">
                      Change your password to keep your account secure.
                    </p>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Change Password</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Enter your current password and a new password.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handlePasswordChange}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="current">Current Password</Label>
                          <Input
                            id="current"
                            type="password"
                            value={passwords.current}
                            onChange={(e) =>
                              setPasswords({
                                ...passwords,
                                current: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new">New Password</Label>
                          <Input
                            id="new"
                            type="password"
                            value={passwords.new}
                            onChange={(e) =>
                              setPasswords({
                                ...passwords,
                                new: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm">Confirm New Password</Label>
                          <Input
                            id="confirm"
                            type="password"
                            value={passwords.confirm}
                            onChange={(e) =>
                              setPasswords({
                                ...passwords,
                                confirm: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit" disabled={isChangingPassword}>
                            {isChangingPassword
                              ? "Changing..."
                              : "Change Password"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

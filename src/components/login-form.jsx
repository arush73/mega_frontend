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
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/app/store/useAuthStore"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { user, isLoggingIn, loginUser, checkUser } = useAuthStore()

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      window.location.href = "/"
    }
  }, [user])

  const handleLogin = () => {
    const data = {
      email,
      password,
    }

    console.log("data: ", data)
    loginUser(data)
  }

  const handleGithubLogin = () => {
    window.location.href = `http://localhost:8080/api/v1/auth/github`
  }

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:8080/api/v1/auth/google`
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGithubLogin}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Github
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGoogleLogin}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                >
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Dialog>
          <DialogTrigger asChild>
            <Link href="#">Terms of Service</Link>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Terms of Service (faaltu ka AI generated ha)
              </DialogTitle>
              <DialogDescription className="text-xs">
                Last updated: 23 Nov 2025
              </DialogDescription>
            </DialogHeader>

            {/* MAIN CONTENT */}
            <div className="mt-4 space-y-6 text-sm leading-relaxed">
              <p>
                Welcome to <span className="font-semibold">TeamBuilder</span>{" "}
                (“we”, “us”, “our”). By accessing or using the Service, you
                agree to be bound by these Terms of Service. If you do not
                agree, please do not use the Service.
              </p>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">1. Eligibility</h3>
                <p>
                  You must be at least 13 years old to use the Service. By using
                  TeamBuilder, you confirm that you have the legal capacity to
                  enter into these Terms.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  2. Account Registration
                </h3>
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account credentials and for all activities under your
                  account. You agree to provide accurate and complete
                  information when registering.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">3. Acceptable Use</h3>
                <p>You agree not to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Use the Service for any unlawful or unauthorized purpose,
                  </li>
                  <li>Harass, abuse, or harm other users,</li>
                  <li>Upload malicious files, spam, or harmful content,</li>
                  <li>
                    Attempt to disrupt, hack, or reverse engineer the Service.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  4. Intellectual Property
                </h3>
                <p>
                  All code, design, and branding of TeamBuilder are owned by the
                  developer(s). You retain ownership of the content you upload,
                  but grant us a license to store and process it for providing
                  the Service.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  5. Service Availability
                </h3>
                <p>
                  The Service is provided on an “as-is” and “as-available”
                  basis. We may modify, suspend, or discontinue any part of the
                  Service at any time without prior notice.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  6. Limitation of Liability
                </h3>
                <p>
                  To the maximum extent permitted by law, we are not liable for
                  any indirect, incidental, or consequential damages, including
                  loss of data or profits, arising from your use of the Service.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">7. Governing Law</h3>
                <p>
                  These Terms are governed by the laws of India. Any disputes
                  will be subject to the exclusive jurisdiction of the courts of
                  New Delhi, India (or your city).
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">8. Contact</h3>
                <p>
                  For any questions regarding these Terms, contact us at{" "}
                  <span className="font-mono text-xs">
                    contact@teambuilder.app
                  </span>
                  .
                </p>
              </section>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>{" "}
        and{" "}
        <Dialog>
          <DialogTrigger asChild>
            <Link href="#">Privacy Policy</Link>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Privacy Policy (Again faaltu ka AI generated)
              </DialogTitle>
              <DialogDescription className="text-xs">
                Last updated: 23 Nov 2025
              </DialogDescription>
            </DialogHeader>

            {/* MAIN PRIVACY POLICY CONTENT */}
            <div className="mt-4 space-y-6 text-sm leading-relaxed">
              <p>
                This Privacy Policy explains how <strong>TeamBuilder</strong>{" "}
                (“we”, “us”, “our”) collects, uses, and protects your
                information when you use our service. By using TeamBuilder, you
                consent to this Policy.
              </p>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  1. Information We Collect
                </h3>
                <p>We may collect the following:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Basic account info (name, email)</li>
                  <li>
                    Authentication identifiers (including via Google OAuth if
                    used)
                  </li>
                  <li>
                    Messages, files, or content uploaded while using the
                    platform
                  </li>
                  <li>Device / browser info, IP address, usage logs</li>
                  <li>Cookies for session management</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  2. How We Use Your Information
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>To provide and improve the Service</li>
                  <li>To authenticate users and secure accounts</li>
                  <li>To analyse usage and improve performance</li>
                  <li>To send important updates (only when required)</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">3. Data Sharing</h3>
                <p>
                  We do <strong>not</strong> sell or rent your personal data.
                  Data may only be shared with:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Service providers (cloud hosting, database, email tools)
                  </li>
                  <li>Law enforcement agencies if legally required</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  4. Data Storage & Security
                </h3>
                <p>
                  Data is stored using secure cloud infrastructure. We apply
                  reasonable security measures, but no system is 100% secure.
                  Users are responsible for protecting their account
                  credentials.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">5. Cookies</h3>
                <p>
                  We use cookies to maintain login sessions and improve
                  experience. You may disable cookies, but some features may not
                  function correctly.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  6. Third-Party Services
                </h3>
                <p>
                  If OAuth (e.g., Google Sign-In) is used, their respective
                  privacy policies apply for authentication. We do not control
                  how third parties handle your data.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">7. Data Retention</h3>
                <p>
                  We retain user data as long as required for providing the
                  Service or as necessary to comply with legal obligations.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">8. Your Rights</h3>
                <p>You may request:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Access to your stored data</li>
                  <li>Correction of inaccurate information</li>
                  <li>Account deletion (unless legally restricted)</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  9. Children’s Privacy
                </h3>
                <p>
                  The Service is not intended for users under 13. We do not
                  knowingly collect data from minors.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">
                  10. Changes to This Policy
                </h3>
                <p>
                  We may update this Privacy Policy from time to time. Continued
                  use of the Service implies acceptance of any updates.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-semibold">11. Contact</h3>
                <p>
                  For any privacy-related queries, contact us at{" "}
                  <span className="font-mono text-xs">
                    contact@teambuilder.app
                  </span>
                  .
                </p>
              </section>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </FieldDescription>
    </div>
  )
}

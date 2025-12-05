"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FolderGit2,
  Settings,
  Bell,
  Search,
  Menu,
  LogOut,
  Plus,
  MoreVertical,
  Github,
  Linkedin,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ProfileForm } from "@/components/profile-form"
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

// Mock Data
const RECOMMENDED_TEAMMATES = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Frontend Dev",
    skills: ["React", "Tailwind", "Figma", "tight pussy"],
    match: "98%",
  },
  {
    id: 2,
    name: "Alex Kumar",
    role: "Backend Dev",
    skills: ["Node.js", "PostgreSQL", "Redis"],
    match: "95%",
  },
  {
    id: 3,
    name: "Jordan Smith",
    role: "UI/UX Designer",
    skills: ["Figma", "Prototyping", "User Research"],
    match: "92%",
  },
]

const ACTIVE_PROJECTS = [
  {
    id: 1,
    name: "E-Learning Platform",
    status: "In Progress",
    progress: 65,
    dueDate: "2 days left",
  },
  {
    id: 2,
    name: "Finance Dashboard",
    status: "Review",
    progress: 90,
    dueDate: "5 days left",
  },
]

export default function DemoPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-card transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          !isSidebarOpen && "-translate-x-full md:hidden"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <FolderGit2 className="size-5" />
            </div>
            <span>TeamBuilder</span>
          </div>
        </div>

        <nav className="space-y-1 p-4">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
          <NavItem icon={<Users />} label="Find Teammates" />
          <NavItem icon={<MessageSquare />} label="Messages" badge="3" />
          <NavItem icon={<FolderGit2 />} label="My Projects" />
          <NavItem icon={<Settings />} label="Settings" />
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Card className="bg-primary/5 border-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  JD
                </div>
                <div>
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    Full Stack Dev
                  </p>
                </div>
              </div>
              <Link href="/">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <LogOut className="h-4 w-4" />
                  Exit Demo
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden md:block w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for projects, skills, or students..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            <ModeToggle />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your cohort.
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Project
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Main Column */}
            <div className="col-span-4 space-y-6">
              {/* Active Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>
                    Your current ongoing collaborations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ACTIVE_PROJECTS.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-accent/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium leading-none">
                          {project.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {project.dueDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-sm font-medium">
                            {project.progress}%
                          </span>
                          <div className="h-2 w-24 rounded-full bg-secondary mt-1">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommended Teammates */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Teammates</CardTitle>
                  <CardDescription>
                    Based on your skills and project interests.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {RECOMMENDED_TEAMMATES.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium leading-none">
                            {person.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {person.role}
                          </p>
                          <div className="flex gap-2 mt-2">
                            {person.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-900/50">
                          {person.match} Match
                        </span>
                        <Button size="sm" variant="secondary">
                          Connect
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Column */}
            <div className="col-span-3 space-y-6">
              {/* Cohort Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Cohort Activity</CardTitle>
                  <CardDescription>
                    Live updates from your community.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-muted pb-2">
                    <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-primary"></div>
                    <p className="text-sm font-medium">New Project Created</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      "AI Study Group" was started by Sarah and 2 others.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      10 mins ago
                    </p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-muted pb-2">
                    <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-primary"></div>
                    <p className="text-sm font-medium">Hackathon Announced</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      The Winter Cohort Hackathon starts this Friday!
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 hours ago
                    </p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-muted">
                    <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-primary"></div>
                    <p className="text-sm font-medium">New Resource Shared</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Alex shared "Ultimate React Guide" in #resources.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      5 hours ago
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">
                    Need Help?
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    Find a mentor or ask the community.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Button
                    variant="secondary"
                    className="w-full justify-start gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Ask in #general
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full justify-start gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Find a Mentor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Link href="#">Privacy Policy</Link>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update profile</DialogTitle>
          </DialogHeader>

          {/* MAIN PRIVACY POLICY CONTENT */}
          {/* <div className="mt-4 space-y-6 text-sm leading-relaxed">
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
            </div> */}
          <ProfileForm />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function NavItem({ icon, label, active, badge }) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-3 mb-1",
        active && "bg-secondary font-medium"
      )}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {badge}
        </span>
      )}
    </Button>
  )
}

"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Users,
  MessageSquare,
  Shield,
  Zap,
  Layout,
  ArrowRight,
  CheckCircle2,
  GalleryVerticalEnd,
} from "lucide-react"
import { useAuthStore } from "@/app/store/useAuthStore"

export default function Home() {
  const { user } = useAuthStore()
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span>TeamBuilder</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="#features"
              className="hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-primary transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#pricing"
              className="hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {user ? (
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground mb-6 bg-background/50 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              The Future of Cohort Collaboration
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Where Cohorts Become <br className="hidden md:block" />
              <span className="text-primary">High-Performing Teams</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground mb-10">
              Stop losing students to Discord distractions. Provide a focused,
              private environment designed specifically for team formation,
              project collaboration, and live cohort management.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start Building Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base"
                >
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Hero Image Placeholder */}
            <div className="mt-16 rounded-xl border bg-card/50 p-2 shadow-2xl backdrop-blur-sm mx-auto max-w-5xl">
              <div className="aspect-video rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/40 to-transparent z-10"></div>
                {/* Abstract UI Representation */}
                <div className="grid grid-cols-4 gap-4 w-full h-full p-8 opacity-50">
                  <div className="col-span-1 bg-primary/10 rounded-lg h-full"></div>
                  <div className="col-span-3 flex flex-col gap-4">
                    <div className="h-12 bg-primary/10 rounded-lg w-full"></div>
                    <div className="flex-1 bg-primary/5 rounded-lg w-full"></div>
                    <div className="h-20 bg-primary/10 rounded-lg w-full"></div>
                  </div>
                </div>
                <div className="absolute z-20 text-muted-foreground font-medium flex flex-col items-center">
                  <Layout className="h-12 w-12 mb-4 opacity-50" />
                  <p>Immersive Collaboration Interface</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built for Course Creators
              </h2>
              <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
                Everything you need to manage your community and help them
                succeed, without the noise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Seamless Team Formation"
                description="Allow students to find teammates based on skills, timezones, and project interests automatically."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Private & Secure"
                description="A dedicated space for your cohort. No random DMs from strangers, no crypto scams, just learning."
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-primary" />}
                title="Structured Channels"
                description="Organize discussions by topic, week, or project group. Keep conversations focused and retrievable."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="Real-time Collaboration"
                description="Instant messaging, file sharing, and voice channels designed for pair programming and group work."
              />
              <FeatureCard
                icon={<Layout className="h-10 w-10 text-primary" />}
                title="Project Showcases"
                description="Dedicated spaces for teams to showcase their work, get feedback, and build their portfolio."
              />
              <FeatureCard
                icon={<CheckCircle2 className="h-10 w-10 text-primary" />}
                title="Progress Tracking"
                description="Monitor student engagement and team progress with built-in analytics and insights."
              />
            </div>
          </div>
        </section>

        {/* Social Proof / Trust */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-semibold mb-10 text-muted-foreground">
              Trusted by forward-thinking educators
            </h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholders for logos */}
              <div className="flex items-center gap-2 text-xl font-bold">
                <div className="h-8 w-8 bg-foreground rounded-full"></div>
                DevCohort
              </div>
              <div className="flex items-center gap-2 text-xl font-bold">
                <div className="h-8 w-8 bg-foreground rounded-full"></div>
                CodeCamp
              </div>
              <div className="flex items-center gap-2 text-xl font-bold">
                <div className="h-8 w-8 bg-foreground rounded-full"></div>
                DesignSchool
              </div>
              <div className="flex items-center gap-2 text-xl font-bold">
                <div className="h-8 w-8 bg-foreground rounded-full"></div>
                TechMBA
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to upgrade your community?
            </h2>
            <p className="text-primary-foreground/80 text-xl max-w-[600px] mx-auto mb-10">
              Join hundreds of course creators who have switched from Discord to
              TeamBuilder.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-10 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Get Started for Free
              </Button>
            </Link>
            <p className="mt-6 text-sm text-primary-foreground/60">
              No credit card required • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-3" />
                </div>
                <span>TeamBuilder</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The dedicated platform for cohort-based courses and community
                building.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 TeamBuilder SaaS. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-foreground">
                Twitter
              </Link>
              <Link href="#" className="hover:text-foreground">
                GitHub
              </Link>
              <Link href="#" className="hover:text-foreground">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-start p-6 rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div className="mb-4 rounded-lg bg-primary/10 p-3">{icon}</div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

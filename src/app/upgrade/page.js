"use client"
// to be refined
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function UpgradePage() {
  return (
    <div className="container mx-auto py-20 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Upgrade to Pro
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          Unlock the full potential of TeamBuilder with advanced features for
          power users and large cohorts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <PricingCard
          title="Free"
          price="$0"
          description="Perfect for getting started"
          features={[
            "Up to 3 Projects",
            "Basic Team Matching",
            "Community Support",
            "1GB Storage",
          ]}
          buttonText="Current Plan"
          buttonVariant="outline"
        />

        {/* Pro Plan */}
        <PricingCard
          title="Pro"
          price="$19"
          period="/month"
          description="For serious builders and creators"
          features={[
            "Unlimited Projects",
            "Advanced AI Matching",
            "Priority Support",
            "10GB Storage",
            "Private Channels",
            "Analytics Dashboard",
          ]}
          buttonText="Upgrade to Pro"
          popular={true}
        />

        {/* Enterprise Plan */}
        <PricingCard
          title="Enterprise"
          price="Custom"
          description="For large organizations and schools"
          features={[
            "Unlimited Everything",
            "Custom Integrations",
            "Dedicated Success Manager",
            "SSO & Advanced Security",
            "SLA Support",
          ]}
          buttonText="Contact Sales"
          buttonVariant="outline"
        />
      </div>
    </div>
  )
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  popular = false,
}) {
  return (
    <Card
      className={cn(
        "flex flex-col relative",
        popular && "border-primary shadow-lg scale-105 z-10"
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground">{period}</span>}
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={buttonVariant} size="lg">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

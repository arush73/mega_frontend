"use client"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

// Constants matching backend
const AvailableUserPronouns = ["He/Him/His", "She/Her/Hers", "They/Them/Theirs"]
const AvailableProfileAvailability = ["Available", "Busy", "Maybe"]

// Form Schema
const profileFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").optional(),
  displayName: z.string().min(2, "Display name must be at least 2 characters").optional(),
  pronouns: z.enum(AvailableUserPronouns).optional(),
  title: z.string().optional(),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(1000).optional(),
  
  skills: z.string().optional(), // Comma separated string for input
  roles: z.string().optional(), // Comma separated string for input
  
  experience: z.object({
    years: z.coerce.number().min(0).optional(),
    summary: z.string().optional(),
  }).optional(),

  projects: z.array(z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().optional(),
    url: z.string().url("Invalid URL").optional().or(z.literal("")),
    role: z.string().optional(),
  })).optional(),

  social: z.object({
    github: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    twitter: z.string().optional(),
  }).optional(),

  preferences: z.object({
    preferredRoles: z.string().optional(), // Comma separated
    preferredTeamSize: z.coerce.number().min(1).optional(),
    willingToLead: z.boolean().default(false).optional(),
  }).optional(),

  availability: z.enum(AvailableProfileAvailability).optional(),
})

export function ProfileForm({ initialData, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData || {
      pronouns: "He/Him/His",
      availability: "Available",
      projects: [],
      preferences: {
        preferredTeamSize: 4,
        willingToLead: false,
      },
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "projects",
    control: form.control,
  })

  const handleSubmit = (data) => {
    // Transform comma-separated strings back to arrays
    data.pronouns = data.pronouns.toUpperCase()
    const formattedData = {
      ...data,
      skills: data.skills ? data.skills.split(",").map(s => s.trim()) : [],
      roles: data.roles ? data.roles.split(",").map(s => s.trim()) : [],
      preferences: {
        ...data.preferences,
        preferredRoles: data.preferences?.preferredRoles 
          ? data.preferences.preferredRoles.split(",").map(s => s.trim()) 
          : [],
      }
    }
    console.log("this is the formatted data: ", formattedData)
    onSubmit(formattedData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 max-w-4xl mx-auto p-6">
        
        {/* Basic Identity */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Identity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} required/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} required/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pronouns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronouns</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pronouns" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {AvailableUserPronouns.map((pronoun) => (
                        <SelectItem key={pronoun} value={pronoun}>
                          {pronoun}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Stack Developer" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about yourself..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills & Experience */}
        <Card>
          <CardHeader>
            <CardTitle>Skills & Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills (comma separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="React, Node.js, Python" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roles (comma separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="Developer, Designer, Lead" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience.years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="experience.summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief summary of your professional background" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Projects</CardTitle>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => append({ name: "", description: "", url: "", role: "" })}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="grid gap-4 p-4 border rounded-lg relative bg-muted/20">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-destructive hover:text-destructive/90"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`projects.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My Awesome Project" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Role</FormLabel>
                        <FormControl>
                          <Input placeholder="Lead Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`projects.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`projects.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What did you build?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="social.github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Username</FormLabel>
                  <FormControl>
                    <Input placeholder="octocat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social.linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Username</FormLabel>
                  <FormControl>
                    <Input placeholder="in/johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="@johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social.website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://johndoe.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Preferences & Availability */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences & Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="preferences.preferredRoles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Roles (comma separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="Frontend, Backend, Lead" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences.preferredTeamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Team Size</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {AvailableProfileAvailability.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="preferences.willingToLead"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Willing to Lead
                    </FormLabel>
                    <FormDescription>
                      Check this if you are interested in taking a leadership role in projects.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg">Save Profile</Button>
      </form>
    </Form>
  )
}

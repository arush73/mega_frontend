"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { Loader } from "@/components/ui/loader"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/app/store/useAppStore"
import { useAuthStore } from "@/app/store/useAuthStore"

export default function Page() {
  const { user, checkUser, isCheckingUser } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { isInitialDataBeingFetched } = useAppStore()

  // uncomment after dev is complete
  // useEffect(() => {
  //   checkUser()
  // }, [])

  // useEffect(() => {
  //   if(user){
  //     setLoading(false)
  //   }

  //   if(!user){
  //     router.push('/home')
  //   }
  // }, [user])

  // useEffect(() => {
  //   setLoading(isInitialDataBeingFetched || isCheckingUser)
  // }, [isInitialDataBeingFetched, isCheckingUser])

  return (

    loading ? <Loader /> : 
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        }
      }
    >
      <AppSidebar />
      {/* <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Inbox</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
            />
          ))}
        </div>
      </SidebarInset> */}
    </SidebarProvider>
  )
}

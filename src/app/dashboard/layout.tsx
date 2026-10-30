import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import { ReactNode } from "react"


type DashboardLayoutProps ={
    children:ReactNode

}

export default function DashbordLayout({children}:DashboardLayoutProps){
    return(
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto grid gap-6 px-4 py-6
            lg:grid-cols-[260px_minmax(0,1fr)] lg:py-10">
                    <DashboardSidebar/>
                    <div className="min-w-0">
                        {children}
                    </div>
            </div>
        </div>
    )
}
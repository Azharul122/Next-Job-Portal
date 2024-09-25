import DashboardHeader from "@/components/Dashboad/DashboardHeader"
import DashBoardRoutes from "@/components/Dashboad/DashBoardRoutes"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Home, Users2Icon } from "lucide-react"
import Link from "next/link"



const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">


            {/* Dashboard Header */}
            <DashboardHeader />

            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[100vh] max-w-full rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel className="" defaultSize={25}>
                    {/* Dashboard routes */}
                    <DashBoardRoutes/>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">{children}</span>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>

    )
}

export default DashboardLayout
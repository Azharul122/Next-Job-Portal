import { UserButton } from "@clerk/nextjs"


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <header>header</header>

       

            {/* Sidebar */}
            <div className="sidebar">
                sidebar
            </div>
            <div>{children}</div>
        </div>

    )
}

export default DashboardLayout
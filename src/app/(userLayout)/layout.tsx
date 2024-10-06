// import { auth } from "@/auth"
import { auth } from "@/auth"
import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/Navbar/Navbar"
import { getSession } from "next-auth/react"

const MainLaout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()


  return (
    <div className="w-[90%] md:w-[96%] mx-auto h-screen">
      <Navbar></Navbar>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLaout
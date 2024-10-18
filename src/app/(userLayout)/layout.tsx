import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/Navbar/Navbar"

const MainLaout = async ({ children }: { children: React.ReactNode }) => {


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
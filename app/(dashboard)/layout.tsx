import Sidebar from "@/components/canvas/Sidebar"
import Navbar from "@/components/Navbar"

export default function HomeLayout({children}: {
    children: React.ReactNode
}){
    return(
        <>
            {/* <Navbar/> */}
            <Sidebar/>
            {children}
        </>
    )
}




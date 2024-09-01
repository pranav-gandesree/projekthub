import Sidebar from "@/components/canvas/Sidebar"

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




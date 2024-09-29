import ChatInbox from "@/components/canvas/ChatInbox";
import Navbar from "@/components/Navbar";

// import { Sidebar } from "@/components/canvas/SheetDemo";

export default function HomeLayout({ children }: { children: React.ReactNode }) {


  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* The navbar is fixed, so we need to account for its height */}
      <Navbar />
      
      {/* Add top padding to push content below the fixed navbar */}
      <div className="flex-grow pt-20 flex">
        {/* Uncomment if using the sidebar */}
        {/* <Sidebar /> */}
        <main className="flex-grow p-6">
          {children}
        </main>

        
      </div>
    </div>
  );
}





// export default function Layout({ children }: { children: React.ReactNode }) {


//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//      < Sidebar/>
//       <main className="pt-16 pb-8 px-4">
//         <div className="container mx-auto">
//           {children}
//         </div>
//       </main>
//     </div>
//   )
// }
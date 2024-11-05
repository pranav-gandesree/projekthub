
import Navbar from "@/components/Navbar";


export default function HomeLayout({ children }: { children: React.ReactNode }) {


  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      
    
      <div className="flex-grow pt-20 flex">
  
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
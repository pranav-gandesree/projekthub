
// import Navbar from "@/components/Navbar";

// export default function HomeLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col min-h-screen w-full"> 
//       <Navbar />
//       <div className="flex flex-grow ">
//         {/* <Sidebar /> */}
//         <main className="flex-grow p-6 ">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }





import Navbar from "@/components/Navbar";

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

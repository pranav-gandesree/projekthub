import Sidebar from "@/components/canvas/Sidebar";
import Navbar from "@/components/Navbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-screen"> 
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6 ml-[140px]">
          {children}
        </main>
      </div>
    </div>
  );
}

// import SignUpForm from "@/components/form/SignUpForm"
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";


// export default async function SignUp () {

//   const session = await getServerSession(authOptions);

//   if (session) {
//     redirect('/home'); 
//   }

//   return (
//     <div className="">
//       <SignUpForm/>
//     </div>
//   )
// }











import { SignUpInfo } from "@/components/canvas/SignUpInfo";
import SignUpForm from "@/components/form/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen flex">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#4f4f4f1a_1px,transparent_1px),linear-gradient(-45deg,#4f4f4f1a_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative flex flex-col lg:flex-row w-full">

        <div className="lg:w-1/2 flex items-center justify-center p-8">
          <SignUpInfo />
        </div>

        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px transform -rotate-[30deg] origin-top">
          <div className="h-full w-full bg-gradient-to-b from-emerald-400/30 via-purple-400/50 to-emerald-400/30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-purple-400 opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400 to-purple-400 opacity-40"></div>
          </div>
        </div>


        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <SignUpForm />
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-4 right-4 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl"></div>
      <div className="hidden lg:block absolute bottom-4 left-4 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl"></div>
    </div>
  );
}
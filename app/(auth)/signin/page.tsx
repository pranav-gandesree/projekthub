// import { LoginComponent } from '@/components/canvas/LoginComponent';
// import SignInForm from '@/components/form/SignInForm'

// const SignInPage = () => {
//   return (

//     <div className="h-screen flex">

//     <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center">
//       <LoginComponent/>
//     </div>

//     <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-900/50">
//       <SignInForm/>
//       </div>
//   </div>
//   );
// };

// export default SignInPage;
















import { LoginComponent } from "@/components/canvas/LoginComponent";
import SignInForm from "@/components/form/SignInForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return (
    <div className="relative h-screen flex">
      <div className="fixed inset-0">
        <div className="h-full w-full">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
      </div>

      <div className="relative flex w-full">
        <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center p-8">
          <LoginComponent />
        </div>

        <div className="hidden lg:block absolute left-1/2 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-purple-400/50 to-transparent">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-4 left-4 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl"></div>
      <div className="hidden lg:block absolute bottom-4 right-4 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl"></div>
    </div>
  );
}

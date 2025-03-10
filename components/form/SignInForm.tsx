// 'use client'

// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import GoogleSignInButton from "../GoogleSignInButton";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import {Loader} from "lucide-react"

// const FormSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email"),
//   password: z.string()
//     .min(1, "Password is required")
//     .min(8, "Password must have at least 8 characters"),
// });

// const SignInForm = () => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof FormSchema>) => {
//     setLoading(true);
//     const signInData = await signIn("credentials", {
//       redirect: false,
//       email: values.email,
//       password: values.password,
//     });

//     if (signInData?.error) {
//       console.log("Sign-in Error:", signInData.error);
//       toast({
//         title: "Error!",
//         description: "Oops!! Something is wrong",
//         variant: "destructive",
//       });
//       setLoading(false);
//     } else {
//       console.log("Sign-in successful, redirecting to admin...");
//       router.refresh();
//       router.push("/home");
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 z-0">
//         <div className="relative h-full w-full bg-slate-950">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>

//         </div>
//       </div>
//       <div className="relative z-10 flex items-center justify-center h-screen">
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//               <div className="space-y-2">
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-slate-700">Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Email"
//                           {...field}
//                           className="text-slate-700"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-slate-700">Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter your password"
//                           type="password"
//                           {...field}
//                           className="text-slate-700"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <Button className="w-full mt-6" type="submit">
//               {loading && <Loader className="animate-spin h-5 w-5 text-white" />}
//                 Sign In
//               </Button>
//             </form>

//             <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-slate-700">
//               or
//             </div>

//             <GoogleSignInButton>
//             Sign In with Google
//             </GoogleSignInButton>

//             <p className="mt-4 text-slate-700">
//               If you don&apos;t have an account, please&nbsp;
//               <Link className="text-blue-500 hover:underline" href="/signup">
//                 Sign Up
//               </Link>
//             </p>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignInForm;






























"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "testuser@gmail.com",
      password: "testuser",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const signInData = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (signInData?.error) {
      console.log("Sign-in Error:", signInData.error);
      toast({
        title: "Error!",
        description: "Oops!! Something is wrong",
        variant: "destructive",
      });
      setLoading(false);
    } else {
      console.log("Sign-in successful, redirecting to admin...");
      router.refresh();
      router.push("/home");
    }
  };

  return (
    <div className="w-full space-y-6 backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-purple-400/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-purple-400">Welcome Back</h2>
        <p className="text-sm text-purple-400/70">Sign in to your account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-400">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="bg-purple-400/5 border-purple-400/20 text-purple-400 placeholder:text-purple-400/50"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-400">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                    className="bg-purple-400/5 border-purple-400/20 text-purple-400 placeholder:text-purple-400/50"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            type="submit"
            disabled={loading}
          >
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-purple-400/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-950 px-2 text-purple-400/70">or</span>
          </div>
        </div>

        <GoogleSignInButton>Sign in with Google</GoogleSignInButton>

        <p className="text-center text-sm text-purple-400/70">
          Don&apos;t have an account?{" "}
          <Link
            className="text-purple-400 hover:underline font-medium"
            href="/signup"
          >
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignInForm;
// "use client"

// import * as z  from "zod"
// import { useForm } from "react-hook-form"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
//   } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"  
// import { Button } from "@/components/ui/button"
// import {zodResolver} from "@hookform/resolvers/zod"
// import Link from "next/link"
// import GoogleSignInButton from "@/components/GoogleSignInButton"
// import { useRouter } from "next/navigation"

// const FormSchema = z.object({
//     username: z.string().min(1,'username is required'),
//     email: z.string().min(1, 'email is required').email('Invalid Email'),
//     password: z.string().min(1, 'password is required').min(8,'password must have than 8 characters')
//   })


// const SignUpForm = () => {
//     const router = useRouter();
//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//             username: '',
//             email: '',
//             password: ''
//         },

//       })

//       const onSubmit = async (values: z.infer<typeof FormSchema>) =>{
//         console.log(values)
//         const response = await fetch('/api/user', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application.json'
//           },
//           body: JSON.stringify({
//             username: values.username,
//             email: values.email,
//             password: values.password
//           })
//         })

//         if(response.ok){
//           router.push('/signin')
//         }else{
//           console.log("registration failed")
//         }
//       }
     
//   return (
//     <div>
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//         <div className="space-y-2">

//         <FormField
//           control={form.control}
//           name='username'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-slate-700">Username</FormLabel>
//               <FormControl>
//                 <Input placeholder="JohnDoe" className="text-slate-700" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name='email'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-slate-700">Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="Email" className="text-slate-700" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name='password'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-slate-700">Password</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your password" type="password" {...field} 
//                 className="text-slate-700" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>
//         <Button  className="w-full mt-6" type="submit">Sign up</Button>
//       </form>


//     <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-slate-700">
//         or
//     </div>

//       <GoogleSignInButton>Sign Up with google </GoogleSignInButton>

//     <p className="mt-4 text-slate-700">
//         Already have an account, please&nbsp;
//         <Link className='text-blue-500 hover:underline' href='/signin'>Sign In</Link>
//     </p>
      
//     </Form>
//     </div>
//   )
// }

// export default SignUpForm



































"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useState } from "react";
import { Loader } from "lucide-react";

const FormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        router.push("/signin");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 text-transparent bg-clip-text">
          Create Account
        </h2>
        <p className="text-sm text-emerald-400/70">
          Start your journey with DevConnect
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-emerald-400">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="JohnDoe"
                    {...field}
                    className="bg-emerald-400/5 border-emerald-400/20 text-emerald-400 placeholder:text-emerald-400/50"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-emerald-400">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    {...field}
                    className="bg-emerald-400/5 border-emerald-400/20 text-emerald-400 placeholder:text-emerald-400/50"
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
                <FormLabel className="text-emerald-400">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Create a strong password"
                    type="password"
                    {...field}
                    className="bg-emerald-400/5 border-emerald-400/20 text-emerald-400 placeholder:text-emerald-400/50"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-gradient-to-r from-emerald-400 to-purple-400 hover:from-emerald-500 hover:to-purple-500 text-white"
            type="submit"
            disabled={loading}
          >
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-emerald-400/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-950 px-2 text-emerald-400/70">or</span>
          </div>
        </div>

        <GoogleSignInButton>Sign up with Google</GoogleSignInButton>

        <p className="text-center text-sm text-emerald-400/70">
          Already have an account?{" "}
          <Link
            className="text-emerald-400 hover:underline font-medium"
            href="/signin"
          >
            Sign In
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpForm;
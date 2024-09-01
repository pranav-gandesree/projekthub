"use client"

import * as z  from "zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"  
import { Button } from "@/components/ui/button"
import {zodResolver} from "@hookform/resolvers/zod"
import Link from "next/link"
import GoogleSignInButton from "@/components/GoogleSignInButton"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
    username: z.string().min(1,'username is required'),
    email: z.string().min(1, 'email is required').email('Invalid Email'),
    password: z.string().min(1, 'password is required').min(8,'password must have than 8 characters')
  })


const SignUpForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        },

      })

      const onSubmit = async (values: z.infer<typeof FormSchema>) =>{
        console.log(values)
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application.json'
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password
          })
        })

        if(response.ok){
          router.push('/signin')
        }else{
          console.log("registration failed")
        }
      }
     
  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">Username</FormLabel>
              <FormControl>
                <Input placeholder="JohnDoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" type="password" {...field} 
                className="text-slate-700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
        <Button  className="w-full mt-6" type="submit">Sign up</Button>
      </form>


    <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-slate-700">
        or
    </div>

      <GoogleSignInButton>Sign Up with google </GoogleSignInButton>

    <p className="mt-4 text-slate-700">
        Already have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/signin'>Sign In</Link>
    </p>
      
    </Form>
    </div>
  )
}

export default SignUpForm


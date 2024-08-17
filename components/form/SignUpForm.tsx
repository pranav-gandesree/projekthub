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

const FormSchema = z.object({
    username: z.string().min(1,'username is required'),
    email: z.string().min(1, 'email is required').email('Invalid Email'),
    password: z.string().min(1, 'password is required').min(8,'password must have than 8 characters')
  })


const SignUpForm = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: ' ',
            email: ' ',
            password: ' '
        },

      })

      const onSubmit = (values: z.infer<typeof FormSchema>) =>{
        console.log(values)
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
              <FormLabel>Username</FormLabel>
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
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
        <Button  className="w-full mt-6" type="submit">Sign up</Button>
      </form>


    <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
    </div>

      <GoogleSignInButton>Sign Up with google </GoogleSignInButton>

    <p className="mt-4">
        Already have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/signin'>Sign In</Link>
    </p>
      
    </Form>
    </div>
  )
}

export default SignUpForm


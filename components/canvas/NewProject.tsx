// "use client";
// import { useEffect, useState } from "react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "../ui/button";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Checkbox } from "../ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
// import axios from "axios";
// import { useSession } from 'next-auth/react';
// import { useToast } from "@/components/ui/use-toast"
// import { useRouter } from "next/navigation";

// const NewProject = () => {
//   const { data: session, status } = useSession();
//   const { toast } = useToast();
//   const router = useRouter();

//   const formSchema = z.object({
//     title: z.string().min(2, "Title must be at least 2 characters long"),
//     description: z.string().min(10, "Description must be at least 10 characters long"),
//     githubLink: z.string().url("Must be a valid URL").min(10, "GitHub Link must be at least 10 characters long"),
//     liveLink: z.string().url("Must be a valid URL").min(10, "Live Link must be at least 10 characters long"),
//     isPublic: z.boolean().default(true),
//     tags: z.string().min(1, "Must include at least one tag"), // Handle splitting later
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       githubLink: "",
//       liveLink: "",
//       isPublic: true,
//       tags: "",
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     const userId = session?.user?.id;
//     const username = session?.user?.name;

//     if (!userId || !username) {
//       alert("User not logged in.");
//       return;
//     }

//     const tagsArray = data.tags.split(",").map(tag => tag.trim());

//     try {
//       await axios.post("/api/projects", { ...data, userId, username, tags: tagsArray });
//       toast({
//         title: "Hurrayyy",
//         description: "Project created successfully!",
//       });
//       router.push(`/${username}/projects`);
//     } catch (error) {
//       console.error("Error creating project:", error);
//       toast({
//         title: "Error!",
//         description: "Oops!! Something went wrong",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto justify-center bg-transparent shadow-lg rounded-lg p-6 flex space-x-6 border border-slate-200 ">
//       <div className="w-full">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel className="text-slate-200">Project Title</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Catchy title"
//                       {...field}
//                       className="border-gray-400 rounded-lg bg-transparent"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-200">Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Describe your project here..."
//                       className="resize-none border-gray-400 rounded-lg bg-transparent"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
            
//             <div className="flex space-x-4">
//               <FormField
//                 control={form.control}
//                 name="liveLink"
//                 render={({ field }) => (
//                   <FormItem className="w-1/2">
//                     <FormLabel className="text-slate-200">Live Project Link</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="https://myproject.com"
//                         {...field}
//                         className="border-gray-400 rounded-lg bg-transparent"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="githubLink"
//                 render={({ field }) => (
//                   <FormItem className="w-1/2">
//                     <FormLabel className="text-slate-200">GitHub Link</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="https://github.com/username/project"
//                         {...field}
//                         className="rounded-lg bg-transparent"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="tags"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-200">Tags</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter tags separated by commas"
//                       {...field}
//                       className="border-gray-400 rounded-lg bg-transparent"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="isPublic"
//               render={({ field }) => (
//                 <FormItem className="w-1/2 flex items-center space-x-3 rounded-lg p-4 bg-transparent">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                       className="bg-white mt-2"
//                     />
//                   </FormControl>
//                   <FormLabel className="text-slate-200">Make public</FormLabel>
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               className=" bg-purple-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
//             >
//               Submit Project
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default NewProject;
























'use client'


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useSession } from 'next-auth/react'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { FileInput } from "@/components/ui/file-input"
import { motion } from "framer-motion"
import { GitHubLogoIcon, GlobeIcon  } from "@radix-ui/react-icons"
import { TagIcon } from "lucide-react"

const NewProject = () => {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const router = useRouter()

  const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    githubLink: z.string().url("Must be a valid URL").min(10, "GitHub Link must be at least 10 characters long"),
    liveLink: z.string().url("Must be a valid URL").min(10, "Live Link must be at least 10 characters long"),
    isPublic: z.boolean().default(true),
    tags: z.string().min(1, "Must include at least one tag"),
    projectAttachment: z.instanceof(File).optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      githubLink: "",
      liveLink: "",
      isPublic: true,
      tags: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // @ts-ignore
    const userId = session?.user?.id
    const username = session?.user?.name

    if (!userId || !username) {
      toast({
        title: "Error",
        description: "User not logged in.",
        variant: "destructive",
      })
      return
    }

    const tagsArray = data.tags.split(",").map(tag => tag.trim())

    // const formData = new FormData()
    // Object.entries(data).forEach(([key, value]) => {
    //   if (key === 'projectAttachment' && value instanceof File) {
    //     formData.append(key, value)
    //   } else if (typeof value === 'string' || typeof value === 'boolean') {
    //     formData.append(key, value.toString())
    //   }
    // })

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('githubLink', data.githubLink)
    formData.append('liveLink', data.liveLink)
    formData.append('isPublic', data.isPublic.toString())
    formData.append('tags', JSON.stringify(tagsArray))

    formData.append('userId', userId)
    formData.append('username', username)
    formData.append('tags', JSON.stringify(tagsArray))

    

console.log("formdata", formData)


    try {
      console.log("formdata is",formData)
      await axios.post("/api/projects", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast({
        title: "Success",
        description: "Project created successfully!",
      })
      router.push(`/${username}/projects`)
    } catch (error) {
      console.error("Error creating project:", error)
      toast({
        title: "Error",
        description: "Oops! Something went wrong",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl rounded-xl border border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-white">Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Project Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a catchy title"
                        {...field}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project here..."
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="liveLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Live Project Link</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <GlobeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="https://myproject.com"
                            {...field}
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="githubLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">GitHub Link</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <GitHubLogoIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="https://github.com/username/project"
                            {...field}
                            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Tags</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Enter tags separated by commas"
                          {...field}
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="projectAttachment"
                render={({ field: { onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel className="text-white">Project Attachment</FormLabel>
                    <FormControl>
                      <Input
                        accept="image/*,.pdf,.zip"
                        onChange={(e: any) => onChange(e.target.files?.[0])}
                        {...rest}
                        className="bg-gray-800 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 rounded-lg p-4 bg-gray-800 border border-gray-700">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
                      />
                    </FormControl>
                    <FormLabel className="text-white cursor-pointer">Make project public</FormLabel>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className=" bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Submit Project
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default NewProject
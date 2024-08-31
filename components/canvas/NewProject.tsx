
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

// const NewProject = () => {

//   const { data: session, status } = useSession();
//   const [userId, setUserId] = useState<string | null>(null);
//   const { toast } = useToast()

//   const formSchema = z.object({
//     title: z.string().min(2, "Title must be at least 2 characters long"),
//     description: z.string().min(10, "Description must be at least 10 characters long"),
//     githubLink: z.string().url("Must be a valid URL").min(10, "GitHub Link must be at least 10 characters long"),
//     liveLink: z.string().url("Must be a valid URL").min(10, "Live Link must be at least 10 characters long"),
//     isPublic: z.boolean().default(true), // Checkbox validation
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       githubLink: "",
//       liveLink: "",
//       isPublic: true,
//     },
//   });


//   useEffect(() => {
//     if (status === "authenticated") {
//       setUserId(session.user.id || null); 
//     }
//   }, [session, status]);

//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     if (!userId) {
//       alert("User not logged in.");
//       return;
//     }

//     try {
//       await axios.post("/api/projects", { ...data, userId });
//       console.log({...data, userId})
//        toast({
//         title: "Hurrayyy",
//         description: "Project created succesfullyyy!",   
//       })
//     } catch (error) {
//       console.error("Error creating project:", error);
//       toast({
//         title: "Error!",
//         description: "Oops!! Something is wrong",
//         variant: "destructive"
//       })
//     }
//   };


//   return (
//     <div className="max-w-xl mx-auto p-6 bg-[#0d1117] border border-gray-700 rounded-md shadow-lg">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-slate-200">Title</FormLabel>
//                 <FormControl>
//                   <Input
//                     className="w-full bg-[#161b22] border border-gray-700 text-white"
//                     placeholder="Enter project title"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-slate-200">Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     className="w-full bg-[#161b22] border border-gray-700 text-white"
//                     placeholder="Enter project description"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="githubLink"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-slate-200">GitHub Link</FormLabel>
//                 <FormControl>
//                   <Input
//                     className="w-full bg-[#161b22] border border-gray-700 text-white"
//                     placeholder="Enter GitHub link"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="liveLink"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-slate-200">Live Link</FormLabel>
//                 <FormControl>
//                   <Input
//                     className="w-full bg-[#161b22] border border-gray-700 text-white"
//                     placeholder="Enter live project link"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//            <FormField
//             control={form.control}
//             name="isPublic"
//             render={({ field }) => (
//               <FormItem className="flex items-center space-x-2">
//                 <FormControl>
//                   <Checkbox checked={field.value} onCheckedChange={field.onChange}  className="bg-[#161b22] border border-gray-700 text-white mt-2" />
//                 </FormControl>
//                 <FormLabel className=" text-slate-200"> Make project public</FormLabel>
//               </FormItem>
//             )}
//           />
//           <Button
//             type="submit"
//             className="w-full bg-green-600 text-white hover:bg-green-700"
//           >
//             Create Project
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default NewProject;



"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  githubLink: z.string().url({
    message: "Please enter a valid GitHub URL.",
  }),
  liveLink: z.string().url({
    message: "Please enter a valid live project URL.",
  }),
  isPublic: z.boolean().default(false),
});

export default function ProjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      githubLink: "",
      liveLink: "",
      isPublic: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Replace this with your actual submit logic
    console.log(values);
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900">Submit Your Project</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Project Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Give your project a catchy title."
                    {...field}
                    className="border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                <FormLabel className="text-gray-700">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your project here..."
                    className="resize-none border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...field}
                  />
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
                <FormLabel className="text-gray-700">GitHub Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/username/project"
                    {...field}
                    className="border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="liveLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Live Project Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://myproject.com"
                    {...field}
                    className="border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 rounded-lg border p-4 bg-gray-50 border-gray-300">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="text-blue-500"
                  />
                </FormControl>
                <FormLabel className="text-gray-700">Make this project public</FormLabel>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
          >
            Submit Project
          </Button>
        </form>
      </Form>
    </div>
  );
}

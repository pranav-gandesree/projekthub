
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
//   const [userId, setUserId] = useState<string | null>(null);
//   const [username, setUsername] =  useState<string | null>(null);
//   const { toast } = useToast()
//   const router = useRouter()

//   const formSchema = z.object({
//     title: z.string().min(2, "Title must be at least 2 characters long"),
//     description: z.string().min(10, "Description must be at least 10 characters long"),
//     githubLink: z.string().url("Must be a valid URL").min(10, "GitHub Link must be at least 10 characters long"),
//     liveLink: z.string().url("Must be a valid URL").min(10, "Live Link must be at least 10 characters long"),
//     isPublic: z.boolean().default(true), // Checkbox validation
//     tags: z.array(z.string().min(1)).nonempty("Must include at least one tag"),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       githubLink: "",
//       liveLink: "",
//       isPublic: true,
//       tags: [],
//     },
//   });


//   useEffect(() => {
//     if (status === "authenticated") {
//       setUserId(session.user.id || null); 
//       setUsername(session.user.name)
//     }
//   }, [session, status]);



//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     if (!userId) {
//       alert("User not logged in.");
//       return;
//     }

//     try {
//       await axios.post("/api/projects", { ...data, userId, username });

//       // const username = session?.user.name
  
//       toast({
//         title: "Hurrayyy",
//         description: "Project created successfully!",
//       });
  
//       // Redirect to /username/projects
//       router.push(`/${username}/projects`);
  
//     } catch (error) {
//       console.error("Error creating project:", error);
//       toast({
//         title: "Error!",
//         description: "Oops!! Something went wrong",
//         variant: "destructive"
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
//                <FormField
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
//                       onChange={(e) => field.onChange(e.target.value.split(',').map(tag => tag.trim()))}
//                       className="border-gray-400 rounded-lg bg-transparent"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//                 control={form.control}
//                 name="isPublic"
//                 render={({ field }) => (
//                   <FormItem className="w-1/2 flex items-center space-x-3 rounded-lg p-4 
//                   bg-transparent">
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                         className="bg-white mt-2"
//                       />
//                     </FormControl>
//                     <FormLabel className="text-slate-200">Make public</FormLabel>
//                   </FormItem>
//                 )}
//               />

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
















"use client";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";

const NewProject = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    githubLink: z.string().url("Must be a valid URL").min(10, "GitHub Link must be at least 10 characters long"),
    liveLink: z.string().url("Must be a valid URL").min(10, "Live Link must be at least 10 characters long"),
    isPublic: z.boolean().default(true),
    tags: z.string().min(1, "Must include at least one tag"), // Handle splitting later
  });

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
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const userId = session?.user?.id;
    const username = session?.user?.name;

    if (!userId || !username) {
      alert("User not logged in.");
      return;
    }

    const tagsArray = data.tags.split(",").map(tag => tag.trim());

    try {
      await axios.post("/api/projects", { ...data, userId, username, tags: tagsArray });
      toast({
        title: "Hurrayyy",
        description: "Project created successfully!",
      });
      router.push(`/${username}/projects`);
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error!",
        description: "Oops!! Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto justify-center bg-transparent shadow-lg rounded-lg p-6 flex space-x-6 border border-slate-200 ">
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-slate-200">Project Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Catchy title"
                      {...field}
                      className="border-gray-400 rounded-lg bg-transparent"
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
                  <FormLabel className="text-slate-200">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project here..."
                      className="resize-none border-gray-400 rounded-lg bg-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="liveLink"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-slate-200">Live Project Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://myproject.com"
                        {...field}
                        className="border-gray-400 rounded-lg bg-transparent"
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
                  <FormItem className="w-1/2">
                    <FormLabel className="text-slate-200">GitHub Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/project"
                        {...field}
                        className="rounded-lg bg-transparent"
                      />
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
                  <FormLabel className="text-slate-200">Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tags separated by commas"
                      {...field}
                      className="border-gray-400 rounded-lg bg-transparent"
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
                <FormItem className="w-1/2 flex items-center space-x-3 rounded-lg p-4 bg-transparent">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="bg-white mt-2"
                    />
                  </FormControl>
                  <FormLabel className="text-slate-200">Make public</FormLabel>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className=" bg-purple-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            >
              Submit Project
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewProject;

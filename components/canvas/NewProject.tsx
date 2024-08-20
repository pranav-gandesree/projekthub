// "use client"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormDescription,
//     FormLabel,
//     FormMessage,
//   } from "@/components/ui/form";
//   import { zodResolver } from "@hookform/resolvers/zod"
//   import { Input } from "@/components/ui/input"
//   import { Button } from "../ui/button";
//   import { useForm } from "react-hook-form"
//   import { z } from "zod"
// import { Checkbox } from "../ui/checkbox";

// const NewProject = () => {

//     const formSchema = z.object({
//       username: z.string().min(2, {
//         message: "Username must be at least 2 characters.",
//       }),
//     })

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//           username: "",
//         },
//       })

       
//     const onSubmit = () =>{

//     }
    
//   return (
//     <div className="border border-slate-300 w-96">

//     <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//                 <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                     <Input placeholder="shadcn" {...field} />
//                 </FormControl>
//                 <FormMessage />
//                 </FormItem>
//             )}
//             />
//             <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//                 <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                     <Input placeholder="shadcn" {...field} />
//                 </FormControl>
//                 <FormMessage />
//                 </FormItem>
//             )}
//             />
//             <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//                 <FormItem>
//                 <FormLabel>Github Link</FormLabel>
//                 <FormControl>
//                     <Input placeholder="shadcn" {...field} />
//                 </FormControl>
//                 <FormMessage />
//                 </FormItem>
//             )}
//             />
//             <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//                 <FormItem>
//                 <FormLabel>Live Link</FormLabel>
//                 <FormControl>
//                     <Input placeholder="shadcn" {...field} />
//                 </FormControl>
//                 <FormMessage />
//                 </FormItem>
//             )}
//             />
//             <Checkbox />

//             <Button type="submit">Create</Button>
//         </form>
//         </Form>

//     </div>
//   )
// }

// export default NewProject



"use client";
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

const NewProject = () => {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = () => {};

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#0d1117] border border-gray-700 rounded-md shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Title</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-[#161b22] border border-gray-700 text-white"
                    placeholder="Enter project title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full bg-[#161b22] border border-gray-700 text-white"
                    placeholder="Enter project description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">GitHub Link</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-[#161b22] border border-gray-700 text-white"
                    placeholder="Enter GitHub link"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Live Link</FormLabel>
                <FormControl>
                  <Input
                    className="w-full bg-[#161b22] border border-gray-700 text-white"
                    placeholder="Enter live project link"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Checkbox />
            <span className="text-sm text-slate-200">Make project private(only you can see it)</span>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 text-white hover:bg-green-700"
          >
            Create Project
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewProject;


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

const NewProject = () => {

  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast()

  const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    githubLink: z.string().url("Must be a valid URL").min(10, "GitHub Link must be at least 10 characters long"),
    liveLink: z.string().url("Must be a valid URL").min(10, "Live Link must be at least 10 characters long"),
    isPublic: z.boolean().default(true), // Checkbox validation
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      githubLink: "",
      liveLink: "",
      isPublic: true,
    },
  });


  useEffect(() => {
    if (status === "authenticated") {
      setUserId(session.user.id || null); 
    }
  }, [session, status]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    try {
      await axios.post("/api/projects", { ...data, userId });
       toast({
        title: "Hurrayyy",
        description: "Project created succesfullyyy!",   
      })
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error!",
        description: "Oops!! Something is wrong",
        variant: "destructive"
      })
    }
  };


  return (
    <div className="max-w-xl mx-auto p-6 bg-[#0d1117] border border-gray-700 rounded-md shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
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
            name="description"
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
            name="githubLink"
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
            name="liveLink"
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
           <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange}  className="bg-[#161b22] border border-gray-700 text-white mt-2" />
                </FormControl>
                <FormLabel className=" text-slate-200"> Make project public</FormLabel>
              </FormItem>
            )}
          />
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

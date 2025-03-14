
'use client';

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

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from "react";

const NewProject = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitClicked, setIsSubmitClicked] = useState(false); 

  const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    githubLink: z.string().url("Must be a valid URL").min(10, "GitHub Link must be at least 10 characters long"),
    liveLink: z.string().url("Must be a valid URL").min(10, "Live Link must be at least 10 characters long").optional(),
    isPublic: z.boolean().default(true),
    tags: z.array(z.string()).min(1, "Must include at least one tag"),
    image: z.string().optional(),
    category: z.string().nonempty("You must select a category"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

      title: "",
      description: "",
      githubLink: "",
      liveLink: "",
      isPublic: true,
      tags: [],
      image: "",
      category: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const userId = session?.user?.id;
    const username = session?.user?.name;

    if (!userId || !username) {
      alert("User not logged in.");
      return;
    }

    setIsSubmitClicked(true); 
    try {
      await axios.post("/api/projects", { ...data, userId, username });
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

  const handleUploadSuccess = (result: any) => {
    if (isSubmitClicked) {
      form.setValue("image", result?.info.secure_url);
    } else {
      // Do not update the form with image URL if submit is not clicked
      toast({
        title: "Image upload skipped",
        description: "The image will only be saved after submission.",
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Category</FormLabel>
                    <FormControl className="bg-transparent">
                      <select
                        {...field}
                        className="w-full border-gray-400 rounded-lg bg-transparent text-white"
                      >
                        <option value="" disabled selected hidden >
                          Select a category
                        </option>
                        <option value="web2">Web2</option>
                        <option value="blockchain">Blockchain</option>
                        <option value="aiml">AI/ML</option>
                        <option value="app-dev">App Development</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


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
                      onChange={(e) => {
                        // Split input by commas and update the field value with the resulting array
                        field.onChange(e.target.value.split(',').map((tag) => tag.trim()));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CldUploadWidget
            onSuccess={handleUploadSuccess}
              signatureEndpoint="/api/sign-cloudinary-params"
            >
              {({ open }) => (
                <Button onClick={() => open()} className="bg-blue-500 text-white">
                  Upload an Image
                </Button>
              )}
            </CldUploadWidget>

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
              className=" bg-purple-600 text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
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

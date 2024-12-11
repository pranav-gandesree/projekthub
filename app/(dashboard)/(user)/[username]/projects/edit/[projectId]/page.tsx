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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";

interface Tag {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  public: boolean;
  image?: string;
  userId: string;
  tags: Tag[];
}

const EditPage = ({ params }: { params: { projectId: string } }) => {
  const { data: session } = useSession();
  const { projectId } = params;
  const [projectData, setProjectData] = useState<Project | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    githubLink: z.string().url("Must be a valid URL").min(10, "GitHub Link must be at least 10 characters long"),
    liveLink: z.string().url("Must be a valid URL").min(10, "Live Link must be at least 10 characters long").optional(),
    public: z.boolean().default(true),
    tags: z.string().min(1, "Must include at least one tag"),
    // tags: projectData?.tags?.map(tag => tag.name).join(", ") || "",
    image: z.string().optional(),
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`/api/projects/${projectId}`);
        setProjectData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProject();
  }, [projectId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      githubLink: "",
      liveLink: "",
      public: true,
      tags: "",
      image: "",
    },
  });

  useEffect(() => {
    if (projectData) {
      form.reset({
        title: projectData.title || "",
        description: projectData.description || "",
        githubLink: projectData.githubLink || "",
        liveLink: projectData.liveLink || "",
        public: projectData.public || true,
        tags: projectData.tags ? projectData.tags.map(tag => tag.name).join(", ") : "",
        image: projectData.image || "",
      });
    }
  }, [projectData, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const userId = session?.user?.id;
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const tagsArray = data.tags.split(",").map(tag => tag.trim());
    try {
      await axios.put(`/api/projects/${projectId}`, { ...data, userId, tags: tagsArray });
      toast({
        title: "Success!",
        description: "Project updated successfully!",
      });
      router.push(`/${session?.user?.name}/projects`);
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error!",
        description: "Oops! Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleUploadSuccess = (result: any) => {
    form.setValue("image", result?.info.secure_url);
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
                <FormItem>
                  <FormLabel className="text-slate-200">Project Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={e => form.setValue("title", e.target.value)}
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
                      {...field}
                      onChange={e => form.setValue("description", e.target.value)}
                      className="resize-none border-gray-400 rounded-lg bg-transparent"
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
                        {...field}
                        onChange={e => form.setValue("liveLink", e.target.value)}
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
                        {...field}
                        onChange={e => form.setValue("githubLink", e.target.value)}
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
                      {...field}
                      onChange={e => form.setValue("tags", e.target.value)}
                      className="border-gray-400 rounded-lg bg-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



<FormField
  control={form.control}
  name="image"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-slate-200">Project Image</FormLabel>
      <FormControl>
        {form.watch("image") ? (
          <>
            <Image
              src={form.watch("image") || '/default-image.jpg'} 
              alt="Project Image"
              width={200}
              height={200}
              className="rounded-md"
            />
            <Button
              type="button"
              onClick={() => form.setValue("image", "")}
              className="mt-2 bg-red-500 text-white"
            >
              Remove Image
            </Button>
          </>
        ) : (
          <CldUploadWidget onUpload={handleUploadSuccess} signatureEndpoint="/api/sign-cloudinary-params">
            {({ open }) => (
              <Button
                type="button"
                onClick={() => open()}
                className="mt-2 bg-purple-600 text-white"
              >
                Upload Image
              </Button>
            )}
          </CldUploadWidget>
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


            <FormField
              control={form.control}
              name="public"
              render={({ field }) => (
                <FormItem className="w-1/2 flex items-center space-x-3 rounded-lg p-4 bg-transparent">
                  <FormControl>
                    <Checkbox
                      checked={form.watch("public")}
                      onCheckedChange={field.onChange}
                      className="bg-white mt-2"
                    />
                  </FormControl>
                  <FormLabel className="text-slate-200">Make public</FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-purple-500 text-white mt-4">
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditPage;

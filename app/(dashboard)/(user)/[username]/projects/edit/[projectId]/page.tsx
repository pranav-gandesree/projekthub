// "use client";

// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Tag {
//   id: number;
//   name: string;
// }

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   githubLink: string;
//   liveLink: string;
//   public: boolean;
//   image?: string;
//   userId: string;
//   tags: Tag[];
// }

// const EditPage = ({ params }: { params: { projectId: string } }) => {
//   const { data: session } = useSession();
//   const { projectId } = params;

//   const [projectData, setProjectData] = useState<Project | null>(null);
//   const [loading, setLoading] = useState(true);

//   if (!session) {
//     redirect("/home");
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`/api/projects/${projectId}`);
//         console.log(response)
//         setProjectData(response.data); 
//       } catch (error) {
//         console.error("Error fetching project data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [projectId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!projectData) {
//     return <p>No project found!</p>;
//   }

//   return (
//     <>
//       <p>Project ID is: {projectId}</p>
//       <h1>{projectData.title}</h1>
//       <p>{projectData.description}</p>
//       <p>
//         <strong>GitHub Link:</strong>{" "}
//         <a href={projectData.githubLink} target="_blank" rel="noopener noreferrer">
//           {projectData.githubLink}
//         </a>
//       </p>
//       <p>
//         <strong>Live Link:</strong>{" "}
//         <a href={projectData.liveLink} target="_blank" rel="noopener noreferrer">
//           {projectData.liveLink}
//         </a>
//       </p>
//       <p>
//         <strong>Public:</strong> {projectData.public ? "Yes" : "No"}
//       </p>
//       {/* <p>
//         <strong>Tags:</strong>{" "}
//         {projectData.tags.map((tag) => (
//           <span key={tag.id} className="tag">
//             {tag.name}
//           </span>
//         ))}
//       </p> */}
//       {projectData.image && (
//         <img src={projectData.image} alt={projectData.title} className="project-image" />
//       )}
//     </>
//   );
// };

// export default EditPage;































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

const  EditPage = ({ params }: { params: { projectId: string } }) => {
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
    isPublic: z.boolean().default(true),
    tags: z.string().min(1, "Must include at least one tag"),
    image: z.string().optional(),
  });



  useEffect(() => {

    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`/api/projects/${projectId}`);
        console.log(data)
        setProjectData(data)
        
      } catch (error) {
        console.error("Error fetching project data:", error);
      
      } 
    };

    fetchProject();
  },[]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: projectData?.title || "",
      description: projectData?.description || "",
      githubLink: projectData?.githubLink || "",
      liveLink: projectData?.liveLink || "",
      isPublic: projectData?.public || true,
      tags: projectData?.tags?.join(", ") || "",
      image: projectData?.image || "",
    },
  });


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
        description: "Oops!! Something went wrong",
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
                <FormItem className="w-full">
                  <FormLabel className="text-slate-200">Project Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={projectData?.title}
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
                      className="resize-none border-gray-400 rounded-lg bg-transparent"
                      value={projectData?.description}
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
                        value={projectData?.liveLink}
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
                        value={projectData?.githubLink}
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
                      // value={projectData?.tags}
                      className="border-gray-400 rounded-lg bg-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

      {/* <Image src={projectData?.image}></Image> */}

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="w-1/2 flex items-center space-x-3 rounded-lg p-4 bg-transparent">
                  <FormControl>
                    <Checkbox
                      checked={projectData?.public}
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
              className="bg-purple-600 text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            >
              Update Project
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditPage;

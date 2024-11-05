"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  GlobeIcon,
  LockClosedIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Loader from "../Loader";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  public: boolean;
  userId: string;
  tags: string[];
}

interface User {
  id: string;
  name: string;
  projects?: Project[];
  userDetails?: UserDetails;
}

interface UserDetails {
  id: string;
  name: string;
  bio?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
}

export default function UserProfile({ username }: { username: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
        setEditedUser(userData);
      } catch (error) {
        setError("Error fetching user");
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [username]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev!, [name]: value }));
  };

  const handleSave = async () => {
    if (editedUser) {
      try {
        const userId = session?.user?.id;
        const response = await axios.post("/api/user/updateUserDetails", {
          ...editedUser,
          userId,
        });
        if (response.status === 201) {
          setUser(editedUser);
          setIsEditing(false);
        } else {
          setError("Failed to update user data");
        }
      } catch (error) {
        setError("Error updating user data");
        console.error("Error updating user:", error);
      }
    }
  };

  const cancelChanges = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <Loader />;
  }

  // check if the logged-in user is the same as the profile user
  const isCurrentUser = session?.user?.name === username;

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 order-1 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="backdrop-blur-lg bg-opacity-50 bg-gray-800 border border-gray-500 rounded-lg shadow-lg overflow-hidden">
              <CardHeader className="text-center relative">
                <div className="absolute inset-0 h-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white relative z-10 mt-16">
                  <AvatarImage
                    src={`https://avatars.githubusercontent.com/${username}`}
                    alt={user.name}
                  />
                </Avatar>
              </CardHeader>
              <CardContent className="px-6 py-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={editedUser?.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={editedUser?.bio || ""}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={editedUser?.twitter || ""}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Twitter username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        name="github"
                        value={editedUser?.github || ""}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="GitHub username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="portfolio">Portfolio</Label>
                      <Input
                        id="portfolio"
                        name="portfolio"
                        value={editedUser?.portfolio || ""}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Portfolio URL"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">
                      {user.name}
                    </h2>
                    <p className="text-gray-300">
                      {user?.userDetails?.bio || "No bio available"}
                    </p>
                    <div className="flex flex-col space-y-4 ">
                      {user.userDetails?.twitter && (
                        <a
                          href={user?.userDetails?.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center space-x-4"
                        >
                          <TwitterLogoIcon className="w-6 h-6" />
                          <span>{user?.userDetails?.twitter}</span>
                        </a>
                      )}
                      {user.userDetails?.github && (
                        <a
                          href={user.userDetails?.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-300 flex items-center space-x-4"
                        >
                          <GitHubLogoIcon className="w-6 h-6" />
                          <span>{user?.userDetails?.github}</span>
                        </a>
                      )}
                      {user.userDetails?.portfolio && (
                        <a
                          href={user.userDetails.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 flex items-center space-x-4"
                        >
                          <GlobeIcon className="w-6 h-6" />
                          <span>{user?.userDetails?.portfolio}</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="justify-center">
                {isCurrentUser && (
                  <>
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleSave}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          Save Changes
                        </Button>
                        <Button
                          onClick={cancelChanges}
                          className="w-full bg-transparent"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={handleEditClick}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Edit Profile
                      </Button>
                    )}
                  </>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Projects */}

        <div className="w-full lg:w-3/4 order-2 lg:order-2">
          <h2 className="text-2xl font-bold mb-4 text-white">Projects</h2>
          {user.projects && user.projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.projects
                  .filter(
                    (project) => project.public || user.id === session?.user?.id
                  ) //show only public projcts to others
                  .slice(0, 4)
                  .map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="backdrop-blur-lg bg-opacity-50 bg-gray-800 border border-gray-500 rounded-md shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between text-white">
                            {project.title}
                            {project.public ? (
                              <Badge variant="secondary">Public</Badge>
                            ) : (
                              <Badge variant="outline" className="text-white">
                                <LockClosedIcon className="w-3 h-3 mr-1 text-white" />{" "}
                                Private
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="text-gray-300">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex flex-col sm:flex-row justify-start gap-2">
                          <Button
                            variant="default"
                            asChild
                            className="w-full sm:w-auto hover:bg-purple-500 border border-gray-400"
                          >
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GitHubLogoIcon className="w-4 h-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                          <Button
                            asChild
                            className="w-full sm:w-auto hover:bg-purple-500 border border-gray-400"
                          >
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GlobeIcon className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>

              <div className="mt-6">
                <Link href={`/${username}/projects`}>
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Show more projects
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 rounded-md shadow-lg">
              <p className="text-lg text-gray-600 mb-4">No projects found.</p>
              <Button
                onClick={() => router.push("/new")}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
              >
                Add Project
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

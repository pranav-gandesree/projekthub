import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"  

const ProjectCard = () => {
  return (
    <div>
        <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
       
      </CardContent>
      <CardFooter>
        <Button className="w-full">
        github
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default ProjectCard

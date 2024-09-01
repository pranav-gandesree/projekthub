// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
// Ensure the path is correct

export async function POST(request: Request) {
  const { title, description, image, liveLink, githubLink, public: isPublic, userId, tags } = await request.json();

  try {
    const createdTags = await Promise.all(
      tags.map(async (tag: string) => {
        return await prisma.tag.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        });
      })
    );

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        image,
        liveLink,
        githubLink,
        public: isPublic,
        userId,
        tags: {
          connect: createdTags.map(tag => ({ id: tag.id })),
        },
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}




export async function GET() {
  try {
    // Fetch all public projects from the database
    const publicProjects = await prisma.project.findMany({
      where: {
        public: true, // Assuming `public` is the field name in your database
      },
      include: {
        createdBy: true, // Include the user relation 
        tags: true,
      },
    });

    return NextResponse.json(publicProjects);
  } catch (error) {
    console.error("Error fetching public projects:", error);
    return NextResponse.json({ error: 'Failed to fetch public projects' }, { status: 500 });
  }
}



// // pages/api/projects.js
// import type { NextApiRequest, NextApiResponse } from 'next';
// import cloudinary from '@/lib/cloudinary'; 
// import upload from '@/lib/uploadImage'; 
// import prisma from '@/prisma/prisma';

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parsing
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     upload.single('image')(req, res, async (err) => {
//       if (err) return res.status(500).json({ error: 'File upload error' });

//       const { title, description, githubLink, liveLink, isPublic, userId } = req.body;
//       const imageFile = req.file;

//       let imageUrl = '';
//       if (imageFile) {
//         try {
//           const result = await cloudinary.uploader.upload_stream(
//             { folder: 'projects' }, // Optional: specify a folder
//             (error, result) => {
//               if (error) {
//                 console.error('Error uploading to Cloudinary:', error);
//                 res.status(500).json({ error: 'Failed to upload image' });
//                 return;
//               }
//               imageUrl = result.secure_url;
//             }
//           );

//           imageFile.buffer.pipe(result); // Upload the image
//         } catch (uploadError) {
//           console.error('Error uploading image:', uploadError);
//           res.status(500).json({ error: 'Failed to upload image' });
//           return;
//         }
//       }

//       try {
//         const project = await prisma.project.create({
//           data: {
//             title: title as string,
//             description: description as string,
//             githubLink: githubLink as string,
//             liveLink: liveLink as string,
//             public: isPublic === 'true',
//             userId: userId as string,
//             image: imageUrl, // Store the image URL in the database
//           },
//         });

//         res.status(200).json({ project });
//       } catch (error) {
//         console.error('Error creating project:', error);
//         res.status(500).json({ error: 'Failed to create project' });
//       }
//     });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

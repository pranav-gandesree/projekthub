// lib/middleware.ts
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const uploadMiddleware = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const form = new IncomingForm({
    keepExtensions: true,
    uploadDir: path.join(process.cwd(), '/public/uploads'), // You can change this path
    // Other configurations as needed
  });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Error parsing form data' });

    req.body = fields;
    // req. = files.image[0];
    next();
  });
};

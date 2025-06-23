import { Request, Response, Router } from 'express';
import { upload } from '../middlewares/upload';

const router = Router();

// Test route to check if the upload endpoint is accessible
router.get('/', (req: Request, res: Response): void => {
  res.json({ message: 'Upload endpoint is working' });
});

// Handle file uploads
// Helper function to handle the file upload
const handleFileUpload = (req: Request, res: Response): void => {
  try {
    console.log('Uploaded file:', req.file);
    
    if (!req.file) {
      console.log('No file in request');
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    
    console.log('File uploaded successfully:', req.file);
    
    // Return the file URL
    res.status(200).json({
      message: 'File uploaded successfully',
      url: (req.file as any).path,
      file: req.file
    });
  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      message: 'Error uploading file', 
      error: errorMessage 
    });
  }
};

// Handle file uploads
router.post('/', 
  (req: Request, res: Response, next: Function): void => {
    console.log('Upload route hit');
    next();
  },
  upload.single('featuredImage'),
  (req: Request, res: Response): void => {
    handleFileUpload(req, res);
  }
);

export default router;

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10; // 10 articles per page
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      prisma.articles.findMany({ 
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          author: {
            select: {
              name: true,
              imageUrl: true
            }
          },
          _count: {
            select: {
              comments: true,
              likes: true
            }
          }
        }
      }),
      prisma.articles.count()
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    res.json({
      data: articles,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage,
        hasPreviousPage
      }
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
};

export const createArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Get data from the request body
    const { title, category, content, imageUrl ,authorId} = req.body;
    
    // Get the authenticated user's ID from the request (assuming it's set by your auth middleware)
   
    // Validate required fields
    if (!title || !category || !content) {
      res.status(400).json({ 
        message: 'Missing required fields',
        errors: {
          ...(!title && { title: 'Title is required' }),
          ...(!category && { category: 'Category is required' }),
          ...(!content && { content: 'Content is required' })
        }
      });
      return;
    }

    const article = await prisma.articles.create({
      data: {
        title,
        category,
        content,
        featuredImage: imageUrl,
        authorId, // Add the authorId to connect the article to the user
      },
    });

    res.status(201).json(article);
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { title, category, content } = req.body;
    const { id } = req.params;

    const featuredImage = (req.file as any)?.path;

    // Build data to update dynamically
    const updateData: any = {
      title,
      category,
      content,
      ...(featuredImage && { featuredImage: featuredImage }),
    };

    if (featuredImage) {
      updateData.featuredImage = featuredImage;
    }

    const updatedArticle = await prisma.articles.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Error updating article" });
  }
};


export const getSingleArticle = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const article = await prisma.articles.findUnique({ 
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          imageUrl: true
        }
      },
      comments: true,
      likes: true
    }
  });
  if (!article) {
    res.status(404).json({ message: 'Article not found' });
    return;
  }
  res.json(article);
  return;
};

export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await prisma.articles.delete({ where: { id } });
  res.status(204).send();
  return;
};

import { Controller, Post, Body, UploadedFile, UploadedFiles, UseInterceptors, Res, Get, Param, Render, UseGuards, BadRequestException } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Response } from 'express';
import { DataService, News, Video } from '../data/data.service';
import { AuthGuard } from '../admin/auth.guard';

// Upload em memória (o arquivo é enviado ao Supabase Storage no handler), com validação de tipo e tamanho.
const imageUpload = {
  storage: memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 }, // 4 MB (Vercel limita o corpo da requisição a ~4,5 MB)
  fileFilter: (req: any, file: any, cb: any) => {
    if (/^image\/(png|jpe?g|webp|gif|avif)$/i.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Apenas imagens (PNG, JPG, WEBP, GIF, AVIF) são permitidas.'), false);
    }
  },
};

@Controller('news')
export class NewsController {
  constructor(private readonly dataService: DataService) {}

  @Post('publish')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'mainImage', maxCount: 1 }, { name: 'authorImage', maxCount: 1 }], imageUpload))
  async publish(@UploadedFiles() files: { mainImage?: Express.Multer.File[], authorImage?: Express.Multer.File[] }, @Body() body: any, @Res() res: Response) {
    const rawTags = body.tags || '';
    const tagsArray = rawTags.split(',').map((t: string) => t.trim()).filter((t: string) => t).slice(0, 3);
    const mainFile = files?.mainImage?.[0];
    const authorFile = files?.authorImage?.[0];
    const imageUrl = mainFile ? await this.dataService.uploadImage(mainFile) : '';
    const authorImageUrl = authorFile ? await this.dataService.uploadImage(authorFile) : '';

    const newNews: News = {
      id: '',
      title: body.title,
      subtitle: body.subtitle,
      author: body.author,
      authorImage: authorImageUrl,
      date: body.date,
      mainImage: { url: imageUrl, description: body.imageDescription || '' },
      bodyHtml: body.bodyHtml,
      tags: tagsArray,
      createdAt: Date.now(),
    };

    await this.dataService.addNews(newNews);
    return res.redirect(303, '/admin');
  }

  @Get(':id')
  @Render('noticia-single')
  async newsDetail(@Param('id') id: string) {
    const newsItem = await this.dataService.getNewsById(id);
    return { news: newsItem };
  }

  @Post('edit/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'mainImage', maxCount: 1 }, { name: 'authorImage', maxCount: 1 }], imageUpload))
  async editNews(@Param('id') id: string, @Res() res: Response, @Body() body: any, @UploadedFiles() files: { mainImage?: Express.Multer.File[], authorImage?: Express.Multer.File[] }) {
    const existingNews = await this.dataService.getNewsById(id);
    if (!existingNews) return res.redirect(303, '/admin/manage');

    const { title, subtitle, author, date, imageDescription, bodyHtml, tags } = body;
    const tagsArray = tags ? tags.split(',').map((t: string) => t.trim()).filter((t: string) => t) : [];

    const updatedNews: News = {
      ...existingNews,
      title,
      subtitle,
      author,
      date,
      bodyHtml,
      tags: tagsArray,
    };
    
    if (files?.authorImage?.[0]) {
      updatedNews.authorImage = await this.dataService.uploadImage(files.authorImage[0]);
    } else {
      updatedNews.authorImage = existingNews.authorImage;
    }

    if (files?.mainImage?.[0]) {
      updatedNews.mainImage = { url: await this.dataService.uploadImage(files.mainImage[0]), description: imageDescription || '' };
    } else {
      updatedNews.mainImage = { ...existingNews.mainImage, description: imageDescription || '' };
    }

    await this.dataService.updateNews(id, updatedNews);
    return res.redirect(303, '/admin/manage');
  }

  @Post('breaking/publish')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'mainImage', maxCount: 1 }, { name: 'authorImage', maxCount: 1 }], imageUpload))
  async publishBreaking(@UploadedFiles() files: { mainImage?: Express.Multer.File[], authorImage?: Express.Multer.File[] }, @Body() body: any, @Res() res: Response) {
    const rawTags = body.tags || '';
    const tagsArray = rawTags.split(',').map((t: string) => t.trim()).filter((t: string) => t).slice(0, 3);
    const mainFile = files?.mainImage?.[0];
    const authorFile = files?.authorImage?.[0];
    const imageUrl = mainFile ? await this.dataService.uploadImage(mainFile) : '';
    const authorImageUrl = authorFile ? await this.dataService.uploadImage(authorFile) : '';

    const newNews: News = {
      id: '',
      title: body.title,
      subtitle: body.subtitle,
      author: body.author,
      authorImage: authorImageUrl,
      date: body.date,
      mainImage: { url: imageUrl, description: body.imageDescription || '' },
      bodyHtml: body.bodyHtml,
      tags: tagsArray,
      createdAt: Date.now(),
    };

    await this.dataService.addBreakingNews(newNews);
    return res.redirect(303, '/admin/breaking-news/manage');
  }

  @Get('breaking/:id')
  @Render('noticia-single')
  async breakingNewsDetail(@Param('id') id: string) {
    const newsItem = await this.dataService.getBreakingNewsById(id);
    return { news: newsItem };
  }

  @Post('breaking/edit/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'mainImage', maxCount: 1 }, { name: 'authorImage', maxCount: 1 }], imageUpload))
  async editBreakingNews(@Param('id') id: string, @Res() res: Response, @Body() body: any, @UploadedFiles() files: { mainImage?: Express.Multer.File[], authorImage?: Express.Multer.File[] }) {
    const existingNews = await this.dataService.getBreakingNewsById(id);
    if (!existingNews) return res.redirect(303, '/admin/breaking-news/manage');

    const { title, subtitle, author, date, imageDescription, bodyHtml, tags } = body;
    const tagsArray = tags ? tags.split(',').map((t: string) => t.trim()).filter((t: string) => t) : [];

    const updatedNews: News = {
      ...existingNews,
      title,
      subtitle,
      author,
      date,
      bodyHtml,
      tags: tagsArray,
    };
    
    if (files?.authorImage?.[0]) {
      updatedNews.authorImage = await this.dataService.uploadImage(files.authorImage[0]);
    } else {
      updatedNews.authorImage = existingNews.authorImage;
    }

    if (files?.mainImage?.[0]) {
      updatedNews.mainImage = { url: await this.dataService.uploadImage(files.mainImage[0]), description: imageDescription || '' };
    } else {
      updatedNews.mainImage = { ...existingNews.mainImage, description: imageDescription || '' };
    }

    await this.dataService.updateBreakingNews(id, updatedNews);
    return res.redirect(303, '/admin/breaking-news/manage');
  }

  // ==== VIDEOS ====

  @Post('video/publish')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('mainImage', imageUpload))
  async publishVideo(@UploadedFile() file: Express.Multer.File, @Body() body: any, @Res() res: Response) {
    const rawTags = body.tags || '';
    const tagsArray = rawTags.split(',').map((t: string) => t.trim()).filter((t: string) => t).slice(0, 3);
    const imageUrl = file ? await this.dataService.uploadImage(file) : '';

    const newVideo: Video = {
      id: '',
      title: body.title,
      subtitle: body.subtitle,
      author: body.author,
      date: body.date,
      duration: body.duration || '',
      link: body.link,
      mainImage: { url: imageUrl, description: body.imageDescription || '' },
      tags: tagsArray,
      createdAt: Date.now(),
    };

    await this.dataService.addVideo(newVideo);
    return res.redirect(303, '/admin/videos/manage');
  }

  @Post('video/edit/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('mainImage', imageUpload))
  async editVideo(@Param('id') id: string, @Res() res: Response, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
    const existingVideo = await this.dataService.getVideoById(id);
    if (!existingVideo) return res.redirect(303, '/admin/videos/manage');

    const { title, subtitle, author, date, duration, link, imageDescription, tags } = body;
    const tagsArray = tags ? tags.split(',').map((t: string) => t.trim()).filter((t: string) => t) : [];

    const updatedVideo: Video = {
      ...existingVideo,
      title,
      subtitle,
      author,
      date,
      duration: duration || '',
      link,
      tags: tagsArray,
    };

    if (file) {
      updatedVideo.mainImage = { url: await this.dataService.uploadImage(file), description: imageDescription || '' };
    } else {
      updatedVideo.mainImage = { ...existingVideo.mainImage, description: imageDescription || '' };
    }

    await this.dataService.updateVideo(id, updatedVideo);
    return res.redirect(303, '/admin/videos/manage');
  }
}

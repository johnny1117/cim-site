import { Controller, Get, Post, Render, Res, UseGuards, Body, Param, Query } from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { DataService } from '../data/data.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly dataService: DataService) {}

  @Get('login')
  @Render('admin-login')
  loginPage(@Query('error') errorQuery: string) {
    const error = errorQuery === '1';
    return { error };
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const { username, password } = body;
    const user = await this.dataService.findUser(username);

    if (user && this.dataService.verifyPassword(user, password)) {
      res.cookie('admin_session', user.username, {
        httpOnly: true,
        signed: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 8, // 8 horas
      });
      return res.redirect(303, '/admin');
    }

    return res.redirect(303, '/admin/login?error=1');
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('admin_session');
    return res.redirect('/admin/login');
  }

  @Get()
  @UseGuards(AuthGuard)
  @Render('admin-dashboard')
  async dashboard() {
    const [news, breakingNews, videos] = await Promise.all([
      this.dataService.getNews(),
      this.dataService.getBreakingNews(),
      this.dataService.getVideos(),
    ]);
    return { newsCount: news.length, breakingNewsCount: breakingNews.length, videosCount: videos.length };
  }

  @Get('manage')
  @UseGuards(AuthGuard)
  @Render('admin-manage')
  async manageNews() {
    const news = await this.dataService.getNews();
    return { news };
  }

  @Get('edit/:id')
  @UseGuards(AuthGuard)
  @Render('admin-edit')
  async editNewsPage(@Param('id') id: string) {
    const newsItem = await this.dataService.getNewsById(id);
    return { newsItem };
  }

  @Post('delete/:id')
  @UseGuards(AuthGuard)
  async deleteNews(@Param('id') id: string, @Res() res: Response) {
    await this.dataService.deleteNews(id);
    return res.redirect(303, '/admin/manage');
  }

  @Get('breaking-news')
  @UseGuards(AuthGuard)
  @Render('admin-breaking')
  publishBreakingNews() {
    return {};
  }

  @Get('breaking-news/manage')
  @UseGuards(AuthGuard)
  @Render('admin-manage-breaking')
  async manageBreakingNews() {
    const news = await this.dataService.getBreakingNews();
    return { news };
  }

  @Get('breaking-news/edit/:id')
  @UseGuards(AuthGuard)
  @Render('admin-edit-breaking')
  async editBreakingNewsPage(@Param('id') id: string) {
    const newsItem = await this.dataService.getBreakingNewsById(id);
    return { newsItem };
  }

  @Post('breaking-news/delete/:id')
  @UseGuards(AuthGuard)
  async deleteBreakingNews(@Param('id') id: string, @Res() res: Response) {
    await this.dataService.deleteBreakingNews(id);
    return res.redirect(303, '/admin/breaking-news/manage');
  }

  // ==== VIDEOS ====

  @Get('videos')
  @UseGuards(AuthGuard)
  @Render('admin-videos')
  adminVideos() {
    return {};
  }

  @Get('videos/manage')
  @UseGuards(AuthGuard)
  @Render('admin-manage-videos')
  async manageVideos() {
    const videos = await this.dataService.getVideos();
    return { videos };
  }

  @Get('videos/edit/:id')
  @UseGuards(AuthGuard)
  @Render('admin-edit-videos')
  async editVideo(@Param('id') id: string) {
    const videoItem = await this.dataService.getVideoById(id);
    return { videoItem };
  }

  @Post('videos/delete/:id')
  @UseGuards(AuthGuard)
  async deleteVideo(@Param('id') id: string, @Res() res: Response) {
    await this.dataService.deleteVideo(id);
    return res.redirect(303, '/admin/videos/manage');
  }
}

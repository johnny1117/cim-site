import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as crypto from 'crypto';
import * as path from 'path';

export interface News {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorImage?: string;
  date: string;
  mainImage: { url: string; description: string };
  bodyHtml: string;
  tags: string[];
  createdAt: number;
}

export interface Video {
  id: string;
  title: string;
  subtitle: string;
  author: string; // origem (YouTube, Instagram)
  date: string;
  duration: string;
  link: string;
  mainImage: { url: string; description: string };
  tags: string[];
  createdAt: number;
}

@Injectable()
export class DataService {
  private readonly supabase: SupabaseClient;
  private readonly bucket = 'uploads';

  constructor() {
    const url = process.env.SUPABASE_URL || '';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    this.supabase = createClient(url, key, { auth: { persistSession: false } });
  }

  // ===== Mapeamento linha <-> objeto da aplicação =====
  private mapNews(r: any): News {
    let authorName = r.author || '';
    let authorImg = '';
    if (authorName.includes('|authorimg|')) {
      const parts = authorName.split('|authorimg|');
      authorName = parts[0];
      authorImg = parts[1];
    }
    return {
      id: r.id,
      title: r.title,
      subtitle: r.subtitle || '',
      author: authorName,
      authorImage: authorImg,
      date: r.date || '',
      mainImage: { url: r.main_image_url || '', description: r.main_image_description || '' },
      bodyHtml: r.body_html || '',
      tags: r.tags || [],
      createdAt: r.created_at ? new Date(r.created_at).getTime() : 0,
    };
  }

  private newsRow(n: Partial<News>) {
    let finalAuthor = n.author || '';
    if (n.authorImage) {
      finalAuthor = `${n.author || ''}|authorimg|${n.authorImage}`;
    }
    return {
      title: n.title,
      subtitle: n.subtitle,
      author: finalAuthor,
      date: n.date,
      main_image_url: n.mainImage?.url || '',
      main_image_description: n.mainImage?.description || '',
      body_html: n.bodyHtml || '',
      tags: n.tags || [],
    };
  }

  private mapVideo(r: any): Video {
    return {
      id: r.id,
      title: r.title,
      subtitle: r.subtitle || '',
      author: r.author || '',
      date: r.date || '',
      duration: r.duration || '',
      link: r.link || '',
      mainImage: { url: r.main_image_url || '', description: r.main_image_description || '' },
      tags: r.tags || [],
      createdAt: r.created_at ? new Date(r.created_at).getTime() : 0,
    };
  }

  private videoRow(v: Partial<Video>) {
    return {
      title: v.title,
      subtitle: v.subtitle,
      author: v.author,
      date: v.date,
      duration: v.duration || '',
      link: v.link || '',
      main_image_url: v.mainImage?.url || '',
      main_image_description: v.mainImage?.description || '',
      tags: v.tags || [],
    };
  }

  // ===== NEWS =====
  async getNews(): Promise<News[]> {
    const { data } = await this.supabase.from('news').select('*').order('created_at', { ascending: false });
    return (data || []).map((r) => this.mapNews(r));
  }
  async getNewsById(id: string): Promise<News | null> {
    const { data } = await this.supabase.from('news').select('*').eq('id', id).maybeSingle();
    return data ? this.mapNews(data) : null;
  }
  async addNews(item: News) {
    await this.supabase.from('news').insert(this.newsRow(item));
  }
  async updateNews(id: string, item: Partial<News>) {
    await this.supabase.from('news').update(this.newsRow(item)).eq('id', id);
  }
  async deleteNews(id: string) {
    await this.supabase.from('news').delete().eq('id', id);
  }

  // ===== BREAKING NEWS =====
  async getBreakingNews(): Promise<News[]> {
    const { data } = await this.supabase.from('breaking_news').select('*').order('created_at', { ascending: false });
    return (data || []).map((r) => this.mapNews(r));
  }
  async getBreakingNewsById(id: string): Promise<News | null> {
    const { data } = await this.supabase.from('breaking_news').select('*').eq('id', id).maybeSingle();
    return data ? this.mapNews(data) : null;
  }
  async addBreakingNews(item: News) {
    await this.supabase.from('breaking_news').insert(this.newsRow(item));
  }
  async updateBreakingNews(id: string, item: Partial<News>) {
    await this.supabase.from('breaking_news').update(this.newsRow(item)).eq('id', id);
  }
  async deleteBreakingNews(id: string) {
    await this.supabase.from('breaking_news').delete().eq('id', id);
  }

  // ===== VIDEOS =====
  async getVideos(): Promise<Video[]> {
    const { data } = await this.supabase.from('videos').select('*').order('created_at', { ascending: false });
    return (data || []).map((r) => this.mapVideo(r));
  }
  async getVideoById(id: string): Promise<Video | null> {
    const { data } = await this.supabase.from('videos').select('*').eq('id', id).maybeSingle();
    return data ? this.mapVideo(data) : null;
  }
  async addVideo(item: Video) {
    await this.supabase.from('videos').insert(this.videoRow(item));
  }
  async updateVideo(id: string, item: Partial<Video>) {
    await this.supabase.from('videos').update(this.videoRow(item)).eq('id', id);
  }
  async deleteVideo(id: string) {
    await this.supabase.from('videos').delete().eq('id', id);
  }

  // ===== UPLOAD DE IMAGEM (Supabase Storage) =====
  async uploadImage(file: any): Promise<string> {
    if (!file || !file.buffer) return '';
    const ext = path.extname(file.originalname || '') || '.png';
    const name = `mainImage-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const { error } = await this.supabase.storage
      .from(this.bucket)
      .upload(name, file.buffer, { contentType: file.mimetype, upsert: false });
    if (error) throw error;
    const { data } = this.supabase.storage.from(this.bucket).getPublicUrl(name);
    return data.publicUrl;
  }

  // ===== AUTENTICAÇÃO =====
  async findUser(username: string): Promise<any | null> {
    const { data } = await this.supabase.from('admin_users').select('*').eq('username', username).maybeSingle();
    return data || null;
  }

  hashPassword(plain: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(plain, salt, 64).toString('hex');
    return `scrypt$${salt}$${hash}`;
  }

  verifyPassword(user: any, provided: string): boolean {
    if (!user || typeof user.password !== 'string' || typeof provided !== 'string') return false;
    const stored: string = user.password;
    if (stored.startsWith('scrypt$')) {
      const parts = stored.split('$');
      if (parts.length !== 3) return false;
      const calc = crypto.scryptSync(provided, parts[1], 64).toString('hex');
      const a = Buffer.from(parts[2], 'hex');
      const b = Buffer.from(calc, 'hex');
      return a.length === b.length && crypto.timingSafeEqual(a, b);
    }
    return stored === provided;
  }
}

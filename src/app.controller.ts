import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DataService } from './data/data.service';
import { PROJECTS } from './data/projects';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataService: DataService
  ) {}

  @Get()
  @Render('index')
  async root() {
    const allNews = [...(await this.dataService.getNews())];
    allNews.sort((a, b) => b.createdAt - a.createdAt);

    // Mock data para preencher o hero section caso não tenha 6 notícias no BD
    const MOCK_NEWS = [
      {
        id: '#',
        title: 'Antimicrobianos e Gênero: Por que as diferenças biológicas entre os sexos importam na prescrição?',
        subtitle: 'Estudo recente aponta que diferenças farmacocinéticas entre homens e mulheres podem influenciar a eficácia, os efeitos adversos e o risco de resistência bacteriana no uso de antimicrobianos.',
        author: 'Farmacologia',
        date: 'Há 1 hora',
        mainImage: { url: '/ultimas publicações/antimicrobianos e genero.png', description: 'Antimicrobianos e gênero' },
        tags: ['Pesquisa']
      },
      {
        id: '#',
        title: 'Câncer de colo de útero, pela extensionista Eloisy Cavalcanti',
        date: 'Há 2 horas',
        mainImage: { url: '/ultimas publicações/eloisy.png', description: 'Câncer de colo de útero' },
        tags: ['Seminário']
      },
      {
        id: '#',
        title: 'Ozempic®, Mounjaro® e outros agonistas de incretinas, pela extensionista Camila',
        date: 'Há 3 horas',
        mainImage: { url: '/ultimas publicações/camila.jpeg', description: 'Agonistas de incretinas' },
        tags: ['Seminário']
      },
      {
        id: '#',
        title: 'Ibuprofeno pode reduzir risco de Alzheimer, aponta novo estudo',
        date: 'Há 5 horas',
        mainImage: { url: '', description: '' },
        tags: ['Pesquisa']
      },
      {
        id: '#',
        title: 'Calendário nacional de vacinação ganha 3 novas vacinas para 2025',
        date: 'Há 7 horas',
        mainImage: { url: '', description: '' },
        tags: ['Vacinação']
      },
      {
        id: '#',
        title: 'Remédio para colesterol atinge recorde de vendas no Brasil em 2024',
        date: '9 horas',
        mainImage: { url: '', description: '' },
        tags: ['Farmácia']
      }
    ];

    // Preenche a lista com os mocks caso tenha menos de 6 notícias reais
    const displayNews: any[] = [...allNews];
    for (let i = displayNews.length; i < 6; i++) {
      displayNews.push(MOCK_NEWS[i]);
    }
    
    const formatDate = (dateStr: string) => {
      if (!dateStr || !dateStr.includes('T')) return dateStr;
      try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        return dateStr;
      }
    };

    const formattedDisplayNews = displayNews.map(n => ({
      ...n,
      date: formatDate(n.date)
    }));
    
    const mainNews = formattedDisplayNews[0] || null;
    const sideNews = formattedDisplayNews.slice(1, 6);
    const recentNews = formattedDisplayNews.slice(0, 8);
    const tickerNews = formattedDisplayNews.slice(0, 5);
    
    // Mock de breaking news (placeholder visual até haver conteúdo real)
    const MOCK_BREAKING: any[] = [
      {
        id: '#',
        title: 'Novo anticoagulante oral mostra menor risco de sangramento em estudo',
        subtitle: 'Ensaio clínico de fase 3 aponta perfil de segurança superior frente aos antagonistas da vitamina K.',
        date: 'Há 2 horas',
        mainImage: { url: '/breaking news/um novo anticoagulante.png', description: 'Novo anticoagulante' },
        tags: ['Cardiologia'],
      },
      {
        id: '#',
        title: 'Mounjaro recebe nova indicação para apneia obstrutiva do sono',
        subtitle: 'Agência regulatória amplia uso da tirzepatida após resultados em pacientes com obesidade.',
        date: 'Há 4 horas',
        mainImage: { url: '/breaking news/mounjaro para apneia do sono.png', description: 'Mounjaro e apneia do sono' },
        tags: ['Regulação'],
      },
      {
        id: '#',
        title: 'OMS atualiza lista de medicamentos essenciais para 2026',
        subtitle: 'Inclusão de novas terapias oncológicas e antimicrobianos de reserva.',
        date: 'Há 8 horas',
        mainImage: { url: '', description: '' },
        tags: ['Saúde Global'],
      },
      {
        id: '#',
        title: 'Estudo associa adesão ao tratamento a menor reinternação hospitalar',
        subtitle: 'Acompanhamento farmacêutico reduziu retornos em até 30% no período analisado.',
        date: 'Há 12 horas',
        mainImage: { url: '', description: '' },
        tags: ['Farmácia Clínica'],
      },
    ];

    let allBreakingNews = await this.dataService.getBreakingNews();
    allBreakingNews.sort((a, b) => b.createdAt - a.createdAt);
    const displayBreaking: any[] = [...allBreakingNews];
    for (let i = displayBreaking.length; i < 4; i++) displayBreaking.push(MOCK_BREAKING[i]);
    const homeBreakingNews = displayBreaking.slice(0, 4).map(n => ({
      ...n,
      date: formatDate(n.date)
    }));

    // Mock de vídeos (placeholder visual até haver conteúdo real)
    const MOCK_VIDEOS: any[] = [
      {
        id: '#',
        title: 'Uso racional de antibióticos: o que todo paciente precisa saber',
        subtitle: 'Extensionistas do CIM explicam quando o antibiótico é (e não é) necessário.',
        author: 'Instagram',
        date: 'Há 1 dia',
        duration: '4:32',
        link: 'https://www.instagram.com/cimufpb/',
        mainImage: { url: '', description: '' },
        tags: ['Educação'],
      },
      {
        id: '#',
        title: 'Interações medicamentosas perigosas no dia a dia',
        subtitle: 'Combinações comuns que merecem atenção redobrada.',
        author: 'YouTube',
        date: 'Há 3 dias',
        duration: '7:18',
        link: 'https://www.instagram.com/cimufpb/',
        mainImage: { url: '', description: '' },
        tags: ['Segurança'],
      },
      {
        id: '#',
        title: 'Como descartar medicamentos vencidos corretamente',
        subtitle: 'Orientações práticas para reduzir o impacto ambiental e o risco à saúde.',
        author: 'Instagram',
        date: 'Há 5 dias',
        duration: '3:05',
        link: 'https://www.instagram.com/cimufpb/',
        mainImage: { url: '', description: '' },
        tags: ['Meio Ambiente'],
      },
    ];

    let allVideos = await this.dataService.getVideos();
    allVideos.sort((a, b) => b.createdAt - a.createdAt);
    const displayVideos: any[] = [...allVideos];
    for (let i = displayVideos.length; i < 3; i++) displayVideos.push(MOCK_VIDEOS[i]);
    const homeVideos = displayVideos.slice(0, 3).map(n => ({
      ...n,
      date: formatDate(n.date)
    }));

    return { mainNews, sideNews, recentNews, tickerNews, homeBreakingNews, homeVideos };
  }

  @Get('sobre')
  @Render('sobre')
  sobre() {
    return {};
  }

  @Get('projetos')
  @Render('projetos')
  projetos() {
    return { projects: PROJECTS, total: PROJECTS.length };
  }

  @Get('noticias')
  @Render('noticias')
  noticiasRoute(@Query('page') page: string, @Query('q') q: string) {
    return this.getNoticiasData(page, q, 'noticias');
  }

  @Get('breaking-news')
  @Render('noticias')
  breakingNewsRoute(@Query('page') page: string, @Query('q') q: string) {
    return this.getNoticiasData(page, q, 'breaking');
  }

  @Get('videos')
  @Render('noticias')
  videosRoute(@Query('page') page: string, @Query('q') q: string) {
    return this.getNoticiasData(page, q, 'videos');
  }

  private async getNoticiasData(page: string, q: string, activeTab: string) {
    let allNews = await this.dataService.getNews();
    let allBreakingNews = await this.dataService.getBreakingNews();
    let allVideos = await this.dataService.getVideos();
    
    // Filtro por pesquisa (título ou tag)
    if (q) {
      const search = q.toLowerCase();
      allNews = allNews.filter(n => 
        n.title.toLowerCase().includes(search) || 
        n.tags.some(t => t.toLowerCase().includes(search))
      );
      allBreakingNews = allBreakingNews.filter(n => 
        n.title.toLowerCase().includes(search) || 
        n.tags.some(t => t.toLowerCase().includes(search))
      );
      allVideos = allVideos.filter(n => 
        n.title.toLowerCase().includes(search) || 
        n.tags.some(t => t.toLowerCase().includes(search))
      );
    }
    
    // Identifica qual lista é a ativa para calcular a paginação
    let activeListLength = 0;
    if (activeTab === 'noticias') activeListLength = allNews.length;
    else if (activeTab === 'breaking') activeListLength = allBreakingNews.length;
    else if (activeTab === 'videos') activeListLength = allVideos.length;

    // Paginação
    const limit = 8;
    const currentPage = parseInt(page) || 1;
    const totalPages = Math.ceil(activeListLength / limit) || 1;
    
    // Sort desc (newest first)
    allNews = allNews.sort((a, b) => b.createdAt - a.createdAt);
    allBreakingNews = allBreakingNews.sort((a, b) => b.createdAt - a.createdAt);
    allVideos = allVideos.sort((a, b) => b.createdAt - a.createdAt);
    
    const startIndex = (currentPage - 1) * limit;
    const endIndex = currentPage * limit;
    
    const paginatedNews = allNews.slice(startIndex, endIndex);
    const paginatedBreakingNews = allBreakingNews.slice(startIndex, endIndex);
    const paginatedVideos = allVideos.slice(startIndex, endIndex);

    const formatDate = (dateStr: string) => {
      if (!dateStr || !dateStr.includes('T')) return dateStr;
      try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        return dateStr;
      }
    };

    const formattedPaginatedNews = paginatedNews.map(n => ({
      ...n,
      date: formatDate(n.date)
    }));

    const formattedBreakingNews = paginatedBreakingNews.map(n => ({
      ...n,
      date: formatDate(n.date)
    }));
    
    const formattedVideos = paginatedVideos.map(n => ({
      ...n,
      date: formatDate(n.date)
    }));

    return { 
      news: activeTab === 'noticias' ? formattedPaginatedNews : [], 
      breakingNews: activeTab === 'breaking' ? formattedBreakingNews : [],
      videos: activeTab === 'videos' ? formattedVideos : [],
      q,
      currentPage,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
      nextPage: currentPage + 1,
      prevPage: currentPage - 1,
      activeTabNoticias: activeTab === 'noticias',
      activeTabBreaking: activeTab === 'breaking',
      activeTabVideos: activeTab === 'videos'
    };
  }
}

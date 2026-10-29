import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from '../src/app.module';
import 'hbs';

const express = require('express');
const cookieParser = require('cookie-parser');

// Instância Express reutilizada entre invocações (cache de cold start)
const server = express();

// A Vercel injeta `req.cookies` automaticamente. O pacote `cookie-parser` aborta 
// se vir que `req.cookies` já existe, deixando de configurar os cookies assinados e a senha.
// Então apagamos `req.cookies` para forçar o `cookie-parser` a processar tudo corretamente.
server.use((req: any, res: any, next: any) => {
  req.cookies = undefined;
  next();
});

const secret = process.env.SESSION_SECRET || 'cim-dev-secret-troque-em-producao';
server.use(cookieParser(secret));

let initPromise: Promise<NestExpressApplication> | null = null;

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));

  // redirect:false: sem isso, /projetos (pasta de logos) redirecionaria para /projetos/ em vez de abrir a página
  app.useStaticAssets(join(process.cwd(), 'public'), { redirect: false });
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');
  app.set('trust proxy', 1);

  await app.init();
  return app;
}

export default async function handler(req: any, res: any) {
  if (!initPromise) initPromise = bootstrap();
  await initPromise;
  return server(req, res);
}

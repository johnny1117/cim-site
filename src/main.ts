import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'public'), { redirect: false });
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');
  app.set('trust proxy', 1);

  // Segredo do cookie assinado (defina SESSION_SECRET no ambiente em produção)
  const secret = process.env.SESSION_SECRET || 'cim-dev-secret-troque-em-producao';
  app.use(cookieParser(secret));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

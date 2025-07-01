import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para permitir requisições do frontend (Next.js)
  app.enableCors({
    origin: 'http://localhost:3000', // Permite apenas o frontend local
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // credentials: true // Descomente se precisar enviar cookies/autenticação
  });

  // Faz o servidor ouvir em todas as interfaces de rede (necessário no Docker)
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();

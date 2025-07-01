import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    // ConfigModule carregando variáveis do .env e tornando global o acesso a process.env
    ConfigModule.forRoot({ isGlobal: true }),

    // Configuração do TypeORM usando as variáveis do ambiente
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'crud_db',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true, // ajuda a carregar entidades automaticamente
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

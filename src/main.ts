import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
 
  const app = await NestFactory.create(AppModule);

   const configService = app.get(ConfigService);

  const config=new DocumentBuilder()
  .setTitle("Budget Request System")
  .setVersion('1.0')
  .addTag('BRS')
  .build()
const documentFactory=()=>SwaggerModule.createDocument(app,config);
SwaggerModule.setup('api/docs',app,documentFactory);




const cookieSecret = configService.get('COOKIE_SECRET') || 'my-fallback-secret';

  app.use(cookieParser(cookieSecret));

  app.enableCors({
    origin:'http://localhost:5173',
     credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())


    await app.listen(3000);
}
bootstrap();

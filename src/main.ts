import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config=new DocumentBuilder()
  .setTitle("Budget Request System")
  .setVersion('1.0')
  .addTag('BRS')
  .build()
const documentFactory=()=>SwaggerModule.createDocument(app,config);
SwaggerModule.setup('api/docs',app,documentFactory);



  await app.listen(3000);


  app.use(cookieParser('secret'));

  app.enableCors({
    origin:'http://localhost:5173',
     credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
}
bootstrap();

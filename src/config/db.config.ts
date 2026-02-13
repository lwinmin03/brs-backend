import { ConfigService } from "@nestjs/config";
import path from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

export default (config:ConfigService):PostgresConnectionOptions=>{
    return {
        type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          synchronize:true,
          logging:true,

  entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],

          extra: {
            max: config.get<number>('DB_POOL_SIZE'),
          },
    }
}
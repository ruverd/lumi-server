import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

import { envSchema } from '@/infra/env/env';
import { EnvModule } from '@/infra/env/env.module';
import { HttpModule } from '@/infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
    }),
    HttpModule,
    EnvModule,
  ],
})
export class AppModule {}

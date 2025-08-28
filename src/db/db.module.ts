import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

config({
  path: ['.env', '.env.production', '.env.local'],
});

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(process.env.DATABASE_URL);

const DbProvider = { 
  provide: 'POSTGRES_POOL',
  useValue: sql
}

@Module({

  providers: [DbProvider],
  exports: [ DbProvider],
})
export class DbModule {}

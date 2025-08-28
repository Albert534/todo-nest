import { Injectable, Inject } from '@nestjs/common';
import bcrypt from 'bcrypt';

type Auth = {
  username: string;
  password: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

  async signUp(data: Auth): Promise<any> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
      // check username exists in `user` table
      const usernameCount =
        await this.sql`SELECT username FROM "user" WHERE username = ${data.username}`;

      if (usernameCount.length > 0) {
        throw new Error('Username already exists');
      }

      // insert new user
      const result =
        await this.sql`INSERT INTO "user" (username, password, email) 
                        VALUES (${data.username}, ${hashedPassword}, ${data.email})
                        RETURNING *`;

      return result[0]; // return inserted user
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signIn(data: Omit<Auth, 'username'>): Promise<any> {
    try {
      // find user by email
      const user =
        await this.sql`SELECT * FROM "user" WHERE email = ${data.email}`;

      if (user.length === 0) {
        throw new Error('User not found');
      }

      // compare password
      const isMatch = await bcrypt.compare(data.password, user[0].password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      return user[0]; // authenticated user
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

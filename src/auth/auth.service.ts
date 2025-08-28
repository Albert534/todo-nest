import { Injectable , Inject } from '@nestjs/common';

import bcrypt from 'bcrypt';

type Auth = {
    username : string
    password : string
    email:string
}
@Injectable()
export class AuthService {
    constructor(@Inject ('POSTGRES_POOL') private readonly sql:any) {}

    async signUp (data: Auth ) :Promise<any> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        try {  
            const usernameCount = await this.sql`SELECT username FROM user WHERE username = ${data.username}`
            console.log(usernameCount);
            if(usernameCount.length > 0) {
                throw new Error('Username already exists');
            }
            else {
  await this.sql`INSERT INTO auth (username, password , email) VALUES (${data.username}, ${hashedPassword} , ${data.email})RETURNING *`;}
            }
            
            
           
        catch (error) {
            console.log(error);
        }
     


    
    }

    async signIn (data: Omit<Auth , 'username'>) {
        try {   return await this.sql`SELECT * FROM auth WHERE username = ${data.email} AND password = ${data.password}`;}
        catch (error) {
            console.log(error);
        }
    }

}

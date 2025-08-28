import { Body, Controller, HttpException, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, AuthDTO2 } from 'src/todo-list/dto/auth.dto';
import { HttpStatus } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
@Controller('auth')
export class AuthController {
    constructor( private readonly authService:AuthService){}

    @Post('login')
   async login(@Body() authDTO1: AuthDTO , @Res() res: any) {
    try{ const result = await this.authService.signIn(authDTO1);
       res.status(200).json(result);
    }
   catch (error) {
    throw new HttpException({
      status: 401,
      error: 'Unauthorized',
    }, HttpStatus.FORBIDDEN, {
      cause: error
    });
  }
   

   }
    @Post('signup')
  async signUp(@Body() data: AuthDTO2) {
    try {
      const user = await this.authService.signUp(data);

      return {
        success: true,
        message: 'User registered successfully',
        user,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Sign up failed');
    }
  }




}

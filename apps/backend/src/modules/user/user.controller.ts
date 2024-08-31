import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from './user.service';

@Controller('/user')
@ApiTags('user')
@ApiCookieAuth('session')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async signup(@Body() dto: SignUpDto) {
    return await this.userService.signUp(dto);
  }

  @Post('/sign-in')
  async signIn(@Body() dto: SignInDto) {
    return await this.userService.signIn(dto);
  }

  @Post('/sign-out')
  @ApiCookieAuth('session')
  async signOut() {
    return await this.userService.signOut();
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiCookieAuth('session')
  async getMe() {
    return await this.userService.getMe();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('/user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() dto: SignupDto) {
    return await this.userService.signup(dto);
  }
}

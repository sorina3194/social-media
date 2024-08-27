import { Injectable } from '@nestjs/common';

import { SignupDto } from './dto/signup.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async signup(dto: SignupDto) {
    const user = this.userRepo.create(dto);
    user.id = await this.userRepo.insert(user);
    return user.id;
  }
}

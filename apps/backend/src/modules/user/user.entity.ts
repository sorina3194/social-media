import { Property } from '@mikro-orm/core';
import { Entity, EntityRepositoryType, PrimaryKey } from '@mikro-orm/postgresql';

import { UserRepository } from './user.repository';

@Entity({ repository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  username: string;

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;
}

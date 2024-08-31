import { Entity, Hidden, Property } from '@mikro-orm/core';
import { PrimaryKey } from '@mikro-orm/postgresql';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  username: string;

  @Property({ unique: true })
  email: string;

  @Property({ hidden: true })
  password: Hidden<string>;
}

import { Migration } from '@mikro-orm/migrations';

export class Migration20240827212913 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null);',
    );
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }
}

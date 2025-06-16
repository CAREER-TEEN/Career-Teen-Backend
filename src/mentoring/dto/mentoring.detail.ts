import { User } from '../../User/user.entity';
export class mentoringDetail {
  constructor(user: User) {
    Object.assign(this, user);
  }
}

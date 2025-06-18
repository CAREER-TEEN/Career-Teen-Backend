import { User } from '../../../tempUser/user.entity';
export class mentoringDetail {
  constructor(user: User) {
    Object.assign(this, user);
  }
}

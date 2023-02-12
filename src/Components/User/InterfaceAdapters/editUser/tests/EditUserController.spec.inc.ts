import UserEntity from '../../../Entities/UserEntity';
import IEditUserEntityGateway from '../../../UseCases/editUser/IEditUserEntityGateway';
import IEditUserView from '../IEditUserView';
import IEditUserViewModel from '../IEditUserViewModel';

const userTestExisting: UserEntity = new UserEntity(
  'existingUser@mail.test',
  'EditUserEntityRepositoryPassword',
  '1'
);

export class EditUserEntityRepositoryTest
  implements IEditUserEntityGateway {
  findByEmail(email: string): Promise<UserEntity> {
    if (email !== userTestExisting.getEmail()) {
      throw new Error('user.notexist');
    }
    return new Promise<UserEntity>(resolve => {
      resolve(userTestExisting);
    });
  }

  create(userEntity: UserEntity): Promise<UserEntity> {
    return new Promise<UserEntity>(resolve => {
      resolve(userEntity);
    });
  }
}

export class EditUserViewTest implements IEditUserView {
  render(viewModel: IEditUserViewModel): void {
    throw new Error('EditUserViewTest.render not implemented (test only)');
  }
}

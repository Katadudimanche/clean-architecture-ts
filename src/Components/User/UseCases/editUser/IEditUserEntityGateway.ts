import UserEntity from '../../Entities/UserEntity';
import IEntityGateway from '../../../../ComponentInterfaces/UseCase/IEntityGateway';

export default interface IEditUserEntityGateway extends IEntityGateway {
  findByEmail(email: string): Promise<UserEntity>;

  create(entity: UserEntity): Promise<UserEntity>;
}

import IRequestModel from '../../../../ComponentInterfaces/UseCase/IRequestModel';

export default interface IEditUserRequestModel extends IRequestModel {
  email: string;
  password: string;
}

import IResponseModel from '../../../../ComponentInterfaces/UseCase/IResponseModel';

export default interface IEditUserResponseModel extends IResponseModel {
  id?: string;
  email: string;
}

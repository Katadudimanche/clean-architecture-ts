import IControllerRequestModel from '../../../../ComponentInterfaces/InterfaceAdapters/IControllerRequestModel';

export default interface EditUserControllerRequestModel
  extends IControllerRequestModel {
  email: string;
  password: string;
}

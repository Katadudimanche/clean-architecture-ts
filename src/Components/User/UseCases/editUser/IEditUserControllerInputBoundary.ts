import EditUserRequestModelType from './IEditUserRequestModel';
import IControllerInputBoundary from '../../../../ComponentInterfaces/InterfaceAdapters/IControllerInputBoundary';
/*
import IEditUserEntityGateway from './IEditUserEntityGateway';
import IEditUserView from '../../InterfaceAdapters/IEditUserView';
*/

export default interface IEditUserControllerInputBoundary
  extends IControllerInputBoundary {
  /*
    constructor(
      editUserEntityRepository: IEditUserEntityGateway,
      editUserView: IEditUserView
    ): void;
  */

  execute(editUserRequestModelType: EditUserRequestModelType): void;
}

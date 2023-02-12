// import IEditUserView from './IEditUserView';
import IPresenterOuputBoundary from '../../../../ComponentInterfaces/InterfaceAdapters/IPresenterOuputBoundary';
import IEditUserResponseModel from './IEditUserResponseModel';

export default interface IEditUserPresenterOutputBoundary
  extends IPresenterOuputBoundary {
  // constructor(view: IEditUserView): void;

  presente(editUserResponseModel: IEditUserResponseModel): void;
}

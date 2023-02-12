import IViewModel from '../../../../ComponentInterfaces/InterfaceAdapters/IViewModel';

export default interface IEditUserViewModel extends IViewModel {
  userCreated: boolean;
  id?: string;
  email: string;
  errors?: Array<string>;
}

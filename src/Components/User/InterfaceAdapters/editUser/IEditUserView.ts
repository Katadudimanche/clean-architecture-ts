import IView from '../../../../ComponentInterfaces/InterfaceAdapters/IView';
import IEditUserViewModel from './IEditUserViewModel';

export default interface IEditUserView extends IView {
  render(viewModel: IEditUserViewModel): void;
}

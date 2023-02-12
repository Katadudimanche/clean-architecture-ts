import IEditUserPresenterOutputBoundary from '../../UseCases/editUser/IEditUserPresenterOutputBoundary';
import IEditUserView from './IEditUserView';
import IEditUserResponseModel from '../../UseCases/editUser/IEditUserResponseModel';
import IEditUserViewModel from './IEditUserViewModel';
import EditUserViewModelMapper from './EditUserViewModelMapper';

export default class EditUserPresenter
  implements IEditUserPresenterOutputBoundary {
  private editUserView: IEditUserView;

  constructor(editUserView: IEditUserView) {
    this.editUserView = editUserView;
  }

  presente(editUserResponseModel: IEditUserResponseModel): void {
    const editUserViewModel: IEditUserViewModel =
      EditUserViewModelMapper.mapFromEditUserResponseModel(
        editUserResponseModel
      );
    if (!editUserViewModel.id) {
      editUserViewModel.errors = [];
      editUserViewModel.errors.push('EditUserPresenter.id.undefined');
    }
    this.editUserView.render(editUserViewModel);
  }
}

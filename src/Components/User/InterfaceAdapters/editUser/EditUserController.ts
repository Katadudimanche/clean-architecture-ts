import IEditUserRequestModel from '../../UseCases/editUser/IEditUserRequestModel';
import EditUserControllerRequest from './IEditUserControllerRequest';
import IEditUserEntityGateway from '../../UseCases/editUser/IEditUserEntityGateway';
import EditUserInteractor from '../../UseCases/editUser/EditUserInteractor';
import IEditUserView from './IEditUserView';
import EditUserPresenter from './EditUserPresenter';

export default class EditUserController {
  private editUserEntityRepository: IEditUserEntityGateway;
  private editUserPresenter: EditUserPresenter;

  constructor(
    editUserEntityRepository: IEditUserEntityGateway,
    editUserView: IEditUserView
  ) {
    this.editUserEntityRepository = editUserEntityRepository;
    this.editUserPresenter = new EditUserPresenter(editUserView);
  }

  async execute(
    editUserControllerRequest: EditUserControllerRequest
  ): Promise<void> {
    await this.getEditUserInteractor().execute(
      this.getEditUserRequestModelFromRequest(editUserControllerRequest)
    );
  }

  private getEditUserInteractor(): EditUserInteractor {
    const editUserInteractor: EditUserInteractor = new EditUserInteractor(
      this.editUserEntityRepository,
      this.editUserPresenter
    );
    return editUserInteractor;
  }

  private getEditUserRequestModelFromRequest(
    editUserControllerRequest: EditUserControllerRequest
  ): IEditUserRequestModel {
    const editUserRequestModel: IEditUserRequestModel = {
      email: editUserControllerRequest.email,
      password: editUserControllerRequest.password
    };
    return editUserRequestModel;
  }
}

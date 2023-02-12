import IEditUserRequestModel from './IEditUserRequestModel';
import IEditUserPresenterOutputBoundary from './IEditUserPresenterOutputBoundary';
import IEditUserEntityGateway from './IEditUserEntityGateway';
import IEditUserResponseModel from './IEditUserResponseModel';
import UserEntity from '../../Entities/UserEntity';
import IEditUserControllerInputBoundary from './IEditUserControllerInputBoundary';

export default class EditUserInteractor
  implements IEditUserControllerInputBoundary {
  private userEntity: UserEntity | undefined;
  private entityRepository: IEditUserEntityGateway;
  private presenter: IEditUserPresenterOutputBoundary;

  constructor(
    entityRepository: IEditUserEntityGateway,
    presenter: IEditUserPresenterOutputBoundary
  ) {
    this.entityRepository = entityRepository;
    this.presenter = presenter;
  }

  async execute(requestModel: IEditUserRequestModel) {
    this.userEntity = new UserEntity(requestModel.email, requestModel.password);
    await this.validateRequestModel(requestModel);
    let newUserEntitySaved;

    try {
      newUserEntitySaved = await this.entityRepository.create(this.userEntity);
    } catch (error) {
      throw new Error('EditUserInteractor.repository.create.error');
    }

    // tslint:disable-next-line: max-line-length
    const editUserResponse: IEditUserResponseModel = this.getEditUserResponseModelFromUser(
      newUserEntitySaved
    );
    this.presenter.presente(editUserResponse);
  }

  private async validateRequestModel(requestModel: IEditUserRequestModel) {
    if (!requestModel.email && !requestModel.password) {
      throw new Error('EditUserInteractor.email_and_password.empty');
    } else if (!requestModel.email) {
      throw new Error('EditUserInteractor.email.empty');
    } else if (!requestModel.password) {
      throw new Error('EditUserInteractor.password.empty');
    }
    const userEmail: string = await this.userEntity!.getEmail();
    const isUserExist: boolean = await this.checkNewUserExist(userEmail);
    if (isUserExist) {
      throw new Error('EditUserInteractor.newuser.exist');
    }
  }

  private async checkNewUserExist(email: string): Promise<boolean> {
    try {
      const isUserExist = await this.entityRepository.findByEmail(email);
      return !!isUserExist;
    } catch (error) {
      return false;
    }
  }

  private getEditUserResponseModelFromUser(newUserEntity: UserEntity) {
    const editUserResponse: IEditUserResponseModel = {
      id: newUserEntity.getId()!,
      email: newUserEntity.getEmail()
    };
    return editUserResponse;
  }
}

import IEditUserResponseModel from '../../UseCases/editUser/IEditUserResponseModel';

export default class EditUserViewModelMapper {
  static mapFromEditUserResponseModel(
    editUserResponseModel: IEditUserResponseModel
  ) {
    return {
      userCreated: editUserResponseModel.id! ? true : false,
      id: editUserResponseModel.id!,
      email: editUserResponseModel.email
    };
  }
}

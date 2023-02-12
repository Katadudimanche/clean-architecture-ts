import IEditUserRequestModel from '../IEditUserRequestModel';
import IEditUserResponseModel from '../IEditUserResponseModel';
import IPresenterOuputBoundary from '../../../../../ComponentInterfaces/InterfaceAdapters/IPresenterOuputBoundary';
import UserEntity from '../../../Entities/UserEntity';
import IView from '../../../../../ComponentInterfaces/InterfaceAdapters/IView';
import IEditUserViewModel from '../../../InterfaceAdapters/editUser/IEditUserViewModel';

export function getEditUserRequestModelTest(): IEditUserRequestModel {
  return {
    email: 'EditUserRequestModel@mail.test',
    password: 'myPasswordTest'
  };
}

export function getEditUserExistRequestModel(): IEditUserRequestModel {
  return {
    email: 'getEditUserExistRequestModel@mail.test',
    password: 'EditUserRequestModelPassword'
  };
}

function findByEmailMocked(email: string): Promise<UserEntity> {
  const userTestExisting: UserEntity = new UserEntity(
    'getEditUserExistRequestModel@mail.test',
    'getEditUserExistRequestModel',
    '1'
  );
  if (email !== userTestExisting.getEmail()) {
    throw new Error('user.notexist');
  }
  return new Promise<UserEntity>(resolve => {
    resolve(userTestExisting);
  });
}

export function getEditUserEntityRepository(
  editUserRequestModel: IEditUserRequestModel
) {
  const newUserTestSaved: UserEntity = new UserEntity(
    editUserRequestModel.email,
    editUserRequestModel.password,
    '2'
  );
  return {
    findByEmail: findByEmailMocked,

    create: (): Promise<UserEntity> => {
      return new Promise<UserEntity>(resolve => {
        resolve(newUserTestSaved);
      });
    }
  };
}

export function getEditUserEntityRepositorySaveFailing(
  editUserRequestModel: IEditUserRequestModel
) {
  return {
    findByEmail: findByEmailMocked,

    create: (): Promise<UserEntity> => {
      return new Promise<UserEntity>(() => {
        throw new Error('getTestEntityRepositorySaveFailing');
      });
    }
  };
}

export function getTestView(): IView {
  return {
    render: (viewModel: IEditUserViewModel) => {
      console.info(viewModel);
    }
  };
}

export function getTestPresenter(view: IView): IPresenterOuputBoundary {
  return {
    presente: (responseModel: IEditUserResponseModel): void => {
      const viewModel: IEditUserViewModel = {
        userCreated: true,
        id: responseModel.id,
        email: responseModel.email
      };
      view.render(viewModel);
    }
  };
}

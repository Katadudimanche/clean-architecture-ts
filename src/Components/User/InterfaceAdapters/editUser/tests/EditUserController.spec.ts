import EditUserController from '../EditUserController';
import EditUserInteractor from '../../../UseCases/editUser/EditUserInteractor';
import EditUserControllerRequest from '../IEditUserControllerRequest';
import EditUserPresenter from '../EditUserPresenter';
import IEditUserRequestModel from '../../../UseCases/editUser/IEditUserRequestModel';
import * as testIncludes from './EditUserController.spec.inc';

describe('#EditUserController', () => {

  let consoleInfos: Array<any> = new Array();
  console.info = function(info: string) { consoleInfos.push(info); };

  beforeEach(function() {
    consoleInfos = [];
  });

  it("Should create new EditUserController succeed", () => {
    const editUserEntityRepository = new testIncludes.EditUserEntityRepositoryTest();
    const editUserView = new testIncludes.EditUserViewTest();
    const editUserController: EditUserController = new EditUserController(
      editUserEntityRepository,
      editUserView
    );
    expect(editUserController).toMatchObject(new EditUserController(
      editUserEntityRepository,
      editUserView
    ));
  });

  it("Should getEditUserInteractor return EditUserInteractor", async () => {
    expect.assertions(2);
    const editUserEntityRepository = new testIncludes.EditUserEntityRepositoryTest();
    const editUserView = new testIncludes.EditUserViewTest();
    const editUserController: EditUserController = new EditUserController(
      editUserEntityRepository,
      editUserView
    );
    const editUserControllerRequest: EditUserControllerRequest = {
      email: 'email@email.test',
      password: 'password-test'
    }
    const spy = jest.spyOn(editUserController, 'execute');
    try {
      await editUserController.execute(editUserControllerRequest);
    } catch (e) {
      expect(e.message).toBe('EditUserViewTest.render not implemented (test only)');
    }
    expect(spy).toHaveBeenCalled();

  });

  it("Should getEditUserInteractor return EditUserInteractor", () => {
    const editUserEntityRepository = new testIncludes.EditUserEntityRepositoryTest();
    const editUserView = new testIncludes.EditUserViewTest();
    const editUserController: EditUserController = new EditUserController(
      editUserEntityRepository,
      editUserView
    );
    expect(editUserController['getEditUserInteractor']()).toMatchObject(new EditUserInteractor(
      editUserEntityRepository,
      new EditUserPresenter(editUserView)
    ));
  });

  it("Should getEditUserRequestModelFromRequest return EditUserControllerRequest", () => {
    const editUserEntityRepository = new testIncludes.EditUserEntityRepositoryTest();
    const editUserView = new testIncludes.EditUserViewTest();
    const editUserController: EditUserController = new EditUserController(
      editUserEntityRepository,
      editUserView
    );
    const editUserRequestModel: IEditUserRequestModel = {
      email: 'email@email.test',
      password: 'password-test'
    };
    const editUserControllerRequest: EditUserControllerRequest = {
      email: 'email@email.test',
      password: 'password-test'
    }
    expect(editUserController['getEditUserRequestModelFromRequest'](editUserControllerRequest)).toMatchObject(
      editUserRequestModel
    );
  });

});

import EditUserInteractor from '../EditUserInteractor';
import IEditUserEntityGateway from '../IEditUserEntityGateway';
import IEditUserRequestModel from '../IEditUserRequestModel';
import IPresenterOuputBoundary from '../../../../../ComponentInterfaces/InterfaceAdapters/IPresenterOuputBoundary';
import IView from '../../../../../ComponentInterfaces/InterfaceAdapters/IView';
import * as testIncludes from './EditUserInteractor.spec.inc';
import IEditUserViewModel from '../../../InterfaceAdapters/editUser/IEditUserViewModel';

describe('#EditUserInteractor', () => {

  let consoleInfos: Array<any> = new Array();
  console.info = function(info: string) { consoleInfos.push(info); };
  const editUserRequestModel: IEditUserRequestModel = testIncludes.getEditUserRequestModelTest();
  const editUserExistRequestModel: IEditUserRequestModel = testIncludes.getEditUserExistRequestModel();
  const entityRepository: IEditUserEntityGateway = testIncludes.getEditUserEntityRepository(editUserRequestModel);
  const entityRepositorySaveFailing: IEditUserEntityGateway = testIncludes.getEditUserEntityRepositorySaveFailing(editUserRequestModel);
  const view: IView = testIncludes.getTestView();
  const presenter: IPresenterOuputBoundary = testIncludes.getTestPresenter(view);

  beforeEach(function() {
    consoleInfos = [];
  });

  it('should new user execute responseModel userCreated being true', async () => {
    const userInteractor: EditUserInteractor = new EditUserInteractor(entityRepository, presenter);
    await userInteractor.execute(editUserRequestModel);
    expect(((consoleInfos[0]) as IEditUserViewModel).userCreated).toBe(true);
  })

  it('should return error when email and password is empty', async () => {
    expect.assertions(1);
    try {
      const userInteractor: EditUserInteractor = new EditUserInteractor(entityRepository, presenter);
      await userInteractor.execute({
        email: '',
        password: ''
      });
    } catch (e) {
      expect(e.message).toBe('EditUserInteractor.email_and_password.empty');
    }
  })

  it('should return error when email is empty', async () => {
    expect.assertions(1);
    try {
      const userInteractor: EditUserInteractor = new EditUserInteractor(entityRepository, presenter);
      await userInteractor.execute({
        email: '',
        password: 'passwordtest'
      });
    } catch (e) {
      expect(e.message).toBe('EditUserInteractor.email.empty');
    }
  })

  it('should return error when password is empty', async () => {
    expect.assertions(1);
    try {
      const userInteractor: EditUserInteractor = new EditUserInteractor(entityRepository, presenter);
      await userInteractor.execute({
        email: 'email@mail.test',
        password: ''
      });
    } catch (e) {
      expect(e.message).toBe('EditUserInteractor.password.empty');
    }
  })

  it('should new user throw error when email exist', async () => {
    expect.assertions(1);
    try {
      const userInteractor: EditUserInteractor = new EditUserInteractor(entityRepository, presenter);
      await userInteractor.execute(editUserExistRequestModel);
    } catch (e) {
      expect(e.message).toBe('EditUserInteractor.newuser.exist');
    }
  })

  it('should new user throw error when repository save failed', async () => {
    expect.assertions(1);
    try {
      const userInteractor: EditUserInteractor = new EditUserInteractor(entityRepositorySaveFailing, presenter);
      await userInteractor.execute(editUserRequestModel);
    } catch (e) {
      expect(e.message).toBe('EditUserInteractor.repository.create.error');
    }
  })
});

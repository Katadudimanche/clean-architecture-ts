import EditUserPresenter from '../EditUserPresenter';
import IEditUserView from '../IEditUserView';
import IEditUserResponseModel from '../../../UseCases/editUser/IEditUserResponseModel';
import IEditUserViewModel from '../IEditUserViewModel';
import * as testIncludes from './EditUserPresenter.spec.inc';

describe('#EditUserPresenter', () => {

  let consoleInfos: Array<any> = new Array();
  console.info = function(info: string) { consoleInfos.push(info); };
  const editUserView: IEditUserView = testIncludes.getEditUserViewModel();

  beforeEach(function() {
    consoleInfos = [];
  });

  it("Should create new EditUserPresenter succeed", () => {
    const editUserPresenter: EditUserPresenter = new EditUserPresenter(editUserView);
    expect(editUserPresenter).toMatchObject(new EditUserPresenter(editUserView));
  });

  it("Should presente result to userCreated true when valid EditUserResponseModel", () => {
    const editUserPresenter: EditUserPresenter = new EditUserPresenter(editUserView);
    const editUserResponseModel: IEditUserResponseModel = { id: '1', email: 'EditUserPresenter@mail.test' };
    editUserPresenter.presente(editUserResponseModel);
    expect(((consoleInfos[0]) as IEditUserViewModel).userCreated).toBeTruthy();
  });

  it("Should presente result to userCreated false when invalid EditUserResponseModel", () => {
    const editUserPresenter: EditUserPresenter = new EditUserPresenter(editUserView);
    const editUserResponseModel: IEditUserResponseModel = { email: 'EditUserPresenter@mail.test' };
    editUserPresenter.presente(editUserResponseModel);
    expect(((consoleInfos[0]) as IEditUserViewModel).userCreated).toBeFalsy();
  });

  it("Should presente result return error message 'EditUserPresenter.id.undefined' when id is undefined", () => {
    const editUserPresenter: EditUserPresenter = new EditUserPresenter(editUserView);
    const editUserResponseModel: IEditUserResponseModel = { email: 'EditUserPresenter@mail.test' };
    editUserPresenter.presente(editUserResponseModel);
    expect(((consoleInfos[0]) as IEditUserViewModel).errors).toContain('EditUserPresenter.id.undefined');
  });

});

import express from 'express';
import ActionViewInterface from '../../../../_shared/action-view.interface';
import EditUserController from '../../../../../../../../Components/User/InterfaceAdapters/editUser/EditUserController';
import IEditUserEntityGateway from '../../../../../../../../Components/User/UseCases/editUser/IEditUserEntityGateway';
import IView from '../../../../../../../../ComponentInterfaces/InterfaceAdapters/IView';
import EditUserControllerRequestModel from '../../../../../../../../Components/User/InterfaceAdapters/editUser/IEditUserControllerRequest';
import UserEntityRepository from '../../../../../../../DB/MongoDB/User/UserEntityRepository';
import { View } from '../views/editUserView';

export default class EditUserDeliver {
  private req: express.Request;
  private res: express.Response;

  constructor(req: express.Request, res: express.Response) {
    this.req = req;
    this.res = res;
  }

  public async IndexActionView(): Promise<void> {
    const userRepository: UserEntityRepository = new UserEntityRepository();
    const view: IView = new View(this.res);
    const editUserController: EditUserController = new EditUserController(
      userRepository as IEditUserEntityGateway,
      view
    );
    try {
      await editUserController.execute({
        email: this.req.body.email,
        password: this.req.body.password
      } as EditUserControllerRequestModel);
    } catch (err) {
      const pageParams = {
        title: 'Clearn Architecture - Node.js',
        error_message: err.message
      };
      const viewParams: ActionViewInterface = {
        view: 'UsesCases/User/editUser/views/editUserView.njk',
        params: pageParams
      };
      this.res.render(viewParams.view, viewParams.params);
    }
  }
}

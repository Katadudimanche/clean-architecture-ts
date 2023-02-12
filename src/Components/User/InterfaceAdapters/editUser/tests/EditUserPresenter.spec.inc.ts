import IEditUserView from '../IEditUserView';
import IEditUserViewModel from '../IEditUserViewModel';

export function getEditUserViewModel(): IEditUserView {
  return {
    render: (editUserViewModel: IEditUserViewModel) => {
      console.info(editUserViewModel);
    }
  };
}

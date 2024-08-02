import { useResetRecoilState } from 'recoil';
import { modalOpenState, formDataState, selectedItemState } from './ModalRecoil';

export const useResetModalStates = () => {
  const resetModalOpen = useResetRecoilState(modalOpenState);
  const resetFormData = useResetRecoilState(formDataState);
  const resetSelectedItem = useResetRecoilState(selectedItemState);

  return () => {
    resetModalOpen();
    resetFormData();
    resetSelectedItem();
  };
};
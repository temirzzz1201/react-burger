import ingredientDetailsReducer, { openModal, closeModal } from '../ingredientDetails';

describe('ingredientDetailsSlice reducer', () => {
  const initialState = {
    isOpen: false,
  };

  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle openModal', () => {
    expect(ingredientDetailsReducer(initialState, openModal())).toEqual({
      isOpen: true,
    });
  });

  it('should handle closeModal', () => {
    const openedState = { isOpen: true };
    expect(ingredientDetailsReducer(openedState, closeModal())).toEqual({
      isOpen: false,
    });
  });
});

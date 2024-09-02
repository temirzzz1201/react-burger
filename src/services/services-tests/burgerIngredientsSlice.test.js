import burgerIngredientsReducer from '../burgerIngredients';
import { fetchIngredients } from '../actions';

describe('burgerIngredients reducer', () => {
  const initialState = {
    data: [],
    isLoading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(burgerIngredientsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const state = burgerIngredientsReducer(initialState, fetchIngredients.pending);
    expect(state).toEqual({ ...initialState, isLoading: true, error: null });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = { type: fetchIngredients.fulfilled.type, payload: [{ id: 1, name: 'Ingredient' }] };
    const state = burgerIngredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false, data: action.payload });
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type, error: { message: 'Error' } };
    const state = burgerIngredientsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false, error: 'Error' });
  });
});

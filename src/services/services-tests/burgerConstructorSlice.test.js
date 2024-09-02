import burgerConstructorReducer, { addIngredient, removeIngredient, clearIngredients, initialState } from '../burgerConstructor';

describe('burgerConstructor reducer', () => {

  const testIngredient = {
    _id: '1',
    name: 'Test Ingredient',
    type: 'main',
    price: 100,
    image: 'image.png',
  };

  it('should handle initial state', () => {
    expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addIngredient', () => {
    const action = addIngredient(testIngredient);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]._id).toBe(testIngredient._id);
    expect(state.ingredientCounts[testIngredient._id]).toBe(1);
  });

  it('should handle removeIngredient', () => {
    const ingredientWithId = { ...testIngredient, uniqueId: 'test-unique-id' };
    const initialStateWithIngredient = {
      ...initialState,
      ingredients: [ingredientWithId],
      ingredientCounts: { [testIngredient._id]: 1 },
    };
    const action = removeIngredient('test-unique-id'); 
    const state = burgerConstructorReducer(initialStateWithIngredient, action);
    expect(state.ingredients.length).toBe(0);
    expect(state.ingredientCounts[testIngredient._id]).toBeUndefined();
  });

  it('should handle clearIngredients', () => {
    const state = burgerConstructorReducer(
      {
        bun: testIngredient,
        ingredients: [testIngredient],
        ingredientCounts: { [testIngredient._id]: 1 },
      },
      clearIngredients()
    );
    expect(state).toEqual(initialState);
  });
});

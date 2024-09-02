describe('Burger Constructor E2E Tests', () => {
  const ingredientItemSelector = '[data-test^="ingredient-item"]';
  const burgerConstructorSelector = '[data-test="burger-constructor"]';
  const constructorCartSelector = '[data-test^="constructor-cart"]';
  const modalSelector = '[data-test="modal"]';
  const closeModalSelector = '[data-test="close-modal"]';
  const orderButtonSelector = '[data-test="order-button"]';
  const orderNumberSelector = '[data-test="order-number"]';

  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('postOrder');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    cy.setCookie('accessToken', 'test-accessToken');

    cy.visit('http://localhost:3000');
  });

  it('should drag and drop ingredients to constructor', () => {
    // Дождаться загрузки ингредиентов
    cy.wait('@getIngredients');

    // Проверяем, что ингредиенты загрузились и отображаются
    cy.get(ingredientItemSelector).should('have.length.greaterThan', 0);

    // Перетащить булку в конструктор
    cy.get(ingredientItemSelector).eq(0).trigger('dragstart');
    cy.get(burgerConstructorSelector).trigger('drop');

    // Проверить, что булка добавлена в конструктор
    cy.get(constructorCartSelector).should('exist');

    // Перетащить основной ингредиент в конструктор
    cy.get(ingredientItemSelector).eq(1).trigger('dragstart');
    cy.get(burgerConstructorSelector).trigger('drop');

    // Проверить, что основной ингредиент добавлен в конструктор
    cy.get(constructorCartSelector).should('exist');
  });

  it('should open and close modal', () => {
    // Открытие модалки кликом на ингредиент
    cy.get(ingredientItemSelector).first().click();
    cy.get(modalSelector).should('be.visible');

    // Закрытие модалки кликом на крестик
    cy.get(modalSelector).within(() => {
      cy.get(closeModalSelector).click();
    });

    cy.get(modalSelector).should('not.exist');

    // Повторное открытие модалки кликом на другой ингредиент
    cy.get(ingredientItemSelector).eq(1).click();
    cy.get(modalSelector).should('be.visible');

    // Закрытие модалки кликом вне области модалки
    cy.get('body').click(0, 0);
    cy.get(modalSelector).should('not.exist');
  });

  it('should open modal and close with ESC', () => {
    // Открытие модалки кликом на ингредиент
    cy.get(ingredientItemSelector).first().click();
    cy.get(modalSelector).should('be.visible');

    // Закрытие модалки нажатием на ESC
    cy.get('body').type('{esc}');
    cy.get(modalSelector).should('not.exist');
  });

  it('should display order number after placing order', () => {
    // Перетащить булку в конструктор
    cy.get(ingredientItemSelector).eq(0).trigger('dragstart');
    cy.get(burgerConstructorSelector).trigger('drop');

    // Перетащить основной ингредиент в конструктор
    cy.get(ingredientItemSelector).eq(1).trigger('dragstart');
    cy.get(burgerConstructorSelector).trigger('drop');

    // Отправить заказ
    cy.get(orderButtonSelector).click();

    // Ожидание завершения запроса на создание заказа
    cy.wait('@postOrder');

    // Ожидать, что номер заказа будет показан в модальном окне
    cy.get(orderNumberSelector).contains('123').should('exist');
  });
});

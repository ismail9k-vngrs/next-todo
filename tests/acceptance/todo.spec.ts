const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/';

describe('Todo', () => {
  beforeAll(async () => {
    await page.goto(BASE_URL);
  });

  describe('As a user I should be able to:', () => {
    it('Add a new todo item', async () => {
      await expect(page).toFill('input[type="text"]', 'Buy some milk');
      await expect(page).toClick('.todo__submit');

      await expect(page).toMatchElement('li', { text: 'Buy some milk' });
    });
  });
});

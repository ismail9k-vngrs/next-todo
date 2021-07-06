const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/';

describe('Todo', () => {
  beforeAll(async () => {
    await page.goto(BASE_URL);
  });

  describe('As a user I should be able to:', () => {
    it('Add a new todo item', async () => {
      await expect(page).toFill('input[type="text"]', 'Buy some milk');
      await expect(page).toClick('.todo__submit');
      // await sleep(1000);
      const element = await expect(page).toMatchElement('li');
      await expect(element).toMatch('Buy some milk');
    });

    it('Remove a todo', async () => {
      let element;
      element = await expect(page).toMatchElement('li');

      // Make sure that the element already exists
      await expect(element).toMatch('Buy some milk');

      // Remove the element
      await expect(page).toClick('li > button');

      element = await expect(page).toMatchElement('li');
      await expect(element).toMatch('');
    });
  });
});

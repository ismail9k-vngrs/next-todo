import { sleep } from '../utils';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/';
describe('Todo', () => {
  beforeAll(async () => {
    await page.goto(BASE_URL);
  });

  // beforeEach(async () => {
  //   // Clean TODOs
  //   const els = await page.$$('li > button');
  //   for (const el of els) {
  //     await el.click();
  //   }

  //   await sleep(1000);
  // });

  describe('As a user I should be able to:', () => {
    it('Add a new todo item', async () => {
      await expect(page).toFill('input[type="text"]', 'Buy some milk');
      await expect(page).toClick('.todo__submit');

      await expect(page).toMatchElement('li', { text: 'Buy some milk' });
    });

    it('Remove a todo', async () => {
      // Add element first
      await expect(page).toFill('input[type="text"]', 'Clean my car');
      await expect(page).toClick('.todo__submit');

      // Make sure that the element already exists
      await expect(page).toMatchElement('li', { text: 'Clean my car' });

      // Remove the element
      await expect(page).toClick('li > button');

      const el = await page.$('li');
      expect(el).toBeFalsy;
    });

    it('remove all todos', async () => {
      await expect(page).toClick('.todo__clearAll');

      await sleep(1000);
      const els = await page.$$('li');
      expect(els.length).toBe(0);
    });
  });
});

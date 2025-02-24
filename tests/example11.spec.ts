import { test, expect } from '@playwright/test';
import App from "../src/App.tsx";

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Ожидаем увидеть todos как заголовок
  await expect(page).toHaveTitle(/todos/);
});

// Ожидаем увидеть todos как header
test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
});

//Ожидается "Testing" как новая задача
test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Testing');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  const result = page.getByRole('paragraph')

  await expect(result).toHaveText('Testing')
});


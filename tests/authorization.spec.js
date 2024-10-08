// @ts-check
const { test, expect } = require('@playwright/test');
const { 
  email, 
  password,
  invalidPassword, 
  profile 
} = require("../user");

test('Successful registration', async ({ page }) => {
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);

  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);

  await page.getByTestId('login-submit-btn').click();

  await expect(page).toHaveURL(profile);
  await expect(page.locator("h2")).toContainText("Моё обучение");
  await page.screenshot({ path: "screenshot0.png" });
});

test.only("Unsuccessful authorization", async ({ page }) => {
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);

  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(invalidPassword);

  await page.getByTestId('login-submit-btn').click();

  await expect(page.getByTestId('login-error-hint')).toHaveText("Вы ввели неправильно логин или пароль.");
  await page.screenshot({ path: "screenshot1.png" });
});
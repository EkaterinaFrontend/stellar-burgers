import { test, expect } from '@playwright/test';

// Фейковые токены для авторизации
const mockAccessToken = 'Bearer mock-access-token';
const mockRefreshToken = 'mock-refresh-token';

test.describe('Страница конструктора бургера (Интеграционные тесты)', () => {

  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/har/ingredients.har', {
      url: '**/api/ingredients',
      update: false 
    });

    // Открываем страницу конструктора
    await page.goto('/');
  });

  test('Добавление ingredients в конструктор', async ({ page }) => {
    const bunIngredient = page.locator('text=Краторная булка N-200i').first();
    const mainIngredient = page.locator('text=Филе Люминесцентного Тетраодона').first();
    const constructorTarget = page.locator('text=Соберите бургер').first();

    await bunIngredient.dragTo(constructorTarget);
    await mainIngredient.dragTo(constructorTarget);

    await expect(page.locator('text=Краторная булка N-200i (верх)')).toBeVisible();
    await expect(page.locator('text=Филе Люминесцентного Тетраодона')).toBeVisible();
  });

    test('Работа модальных окон ингредиентов', async ({ page }) => {
    await page.locator('text=Краторная булка N-200i').first().click();
    await expect(page.locator('text=Детали ингредиента')).toBeVisible();

    await expect(page.locator('[class*="modal"], [class*="Modal"]').locator('text=Краторная булка N-200i')).toBeVisible();

    await page.locator('[class*="close"]').first().click();
    await expect(page.locator('text=Детали ингредиента')).not.toBeVisible();

    await page.locator('text=Краторная булка N-200i').first().click();
    const overlay = page.locator('[class*="overlay"]');
    await overlay.click({ position: { x: 5, y: 5 } });
    await expect(page.locator('text=Детали ингредиента')).not.toBeVisible();
  });


  test.describe('Создание заказа с авторизацией', () => {
    
    test.beforeEach(async ({ context, page }) => {
      await context.addInitScript(({ token, refresh }) => {
        window.localStorage.setItem('accessToken', token);
        window.localStorage.setItem('refreshToken', refresh);
      }, { token: mockAccessToken, refresh: mockRefreshToken });

      // Подставляем фейковый токен в Cookies
      await context.addCookies([
        {
          name: 'accessToken',
          value: mockAccessToken,
          domain: 'localhost',
          path: '/'
        }
      ]);

      // Настраиваем HAR-перехват для запросов авторизации и создания заказа
      await page.routeFromHAR('tests/har/auth_and_order.har', {
        url: '**/api/**',
        update: false
      });
    });

    test.afterEach(async ({ context, page }) => {
      await page.evaluate(() => {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
      });
      await context.clearCookies();
    });

    test('Полный цикл создания заказа', async ({ page }) => {
      await page.reload();

      const constructorTarget = page.locator('text=Соберите бургер').first();
      await page.locator('text=Краторная булка N-200i').first().dragTo(constructorTarget);
      await page.locator('text=Филе Люминесцентного Тетраодона').first().dragTo(constructorTarget);

      await page.locator('button:has-text("Оформить заказ")').click();

      // Проверяем открытие модалки заказа с фейковым номером из HAR (например, 7777)
      await expect(page.locator('[class*="modal"]').first()).toBeVisible();

      await page.locator('[class*="close"]').first().click();
      await expect(page.locator('text=Соберите бургер')).toBeVisible();
    });
  });
});

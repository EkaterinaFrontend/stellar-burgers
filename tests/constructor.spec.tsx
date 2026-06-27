import { test, expect } from '@playwright/test';

// Фейковые токены для авторизации
const mockAccessToken = 'Bearer mock-access-token';
const mockRefreshToken = 'mock-refresh-token';

test.describe('Страница конструктора бургера (Интеграционные тесты)', () => {

  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/all.har', {
      url: '**/api/**',
      update: false,
      notFound: 'abort'
    });

    // Открываем страницу конструктора
    await page.goto('/');
  });

  test('Добавление ingredients в конструктор', async ({ page }) => {
    const bunIngredient = page.locator('text=Краторная булка N-200i').first();
    const mainIngredient = page.locator('text=Филе Люминесцентного Тетраодона').first();
    
    const burgerConstructor = page.locator('[class*="burger_constructor"], [class*="burger-constructor"], [class*="constructor"]').first();

    await expect(burgerConstructor.getByText('Краторная булка N-200i')).toBeHidden();

    // Перетаскиваем элементы
    await bunIngredient.dragTo(page.locator('text=Соберите бургер').first());
    await mainIngredient.dragTo(burgerConstructor);

    await expect(burgerConstructor.getByText('Краторная булка N-200i (верх)')).toBeVisible();
    await expect(burgerConstructor.getByText('Филе Люминесцентного Тетраодона')).toBeVisible();
  });

  test('Работа модальных окон ингредиентов', async ({ page }) => {
    const modal = page.locator('#modals');
    await expect(modal).toBeHidden();                       
    
    await page.locator('text=Краторная булка N-200i').first().click();
    await expect(modal).toContainText('Детали ингредиента');
    await expect(modal).toContainText('Краторная булка N-200i'); 
    await expect(modal).toContainText('420');                    
    await page.locator('#modals button svg, #modals button, [class*="close"]').first().click();
    await expect(modal).toBeHidden();
    await page.locator('text=Краторная булка N-200i').first().click();
    await expect(modal).toBeVisible();
    
    const overlay = page.locator('[class*="overlay"]');
    await overlay.click({ position: { x: 5, y: 5 } });
    await expect(modal).toBeHidden();
  });


  test.describe('Создание заказа с авторизацией', () => {
    
    test.beforeEach(async ({ context }) => {
      await context.addInitScript(({ token, refresh }: { token: string; refresh: string }) => {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('accessToken', token);
          window.localStorage.setItem('refreshToken', refresh);
        }
      }, { token: mockAccessToken, refresh: mockRefreshToken });

      await context.addCookies([
        {
          name: 'accessToken',
          value: mockAccessToken,
          domain: 'localhost',
          path: '/'
        }
      ]);
    });

    test.afterEach(async ({ context }) => {
      await context.clearCookies();
    });

    test('Полный цикл создания заказа', async ({ page }) => {
      await page.evaluate(({ token, refresh }) => {
        window.localStorage.setItem('accessToken', token);
        window.localStorage.setItem('refreshToken', refresh);
      }, { token: mockAccessToken, refresh: mockRefreshToken });

      const burgerConstructor = page.locator('[class*="burger_constructor"], [class*="burger-constructor"], [class*="constructor"]').first();
      const bunIngredient = page.locator('text=Краторная булка N-200i').first();
      const mainIngredient = page.locator('text=Филе Люминесцентного Тетраодона').first();

      await bunIngredient.dragTo(page.locator('text=Соберите бургер').first());
      await mainIngredient.dragTo(burgerConstructor);
      const modalContainer = page.locator('#modals');
      await expect(modalContainer).toBeHidden();

      await page.locator('button:has-text("Оформить заказ")').click();

      await expect(modalContainer).toBeVisible({ timeout: 15000 });
      await expect(modalContainer).toContainText('7777');

      await page.locator('#modals button svg, #modals button, [class*="close"]').first().click();
      await expect(page.locator('text=Соберите бургер')).toBeVisible();
    });
  });
});

// @ts-check
const { test, expect } = require('@playwright/test');

// test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);

//   // create a locator
//   const getStarted = page.locator('text=Get Started');

//   // Expect an attribute "to be strictly equal" to the value.
//   await expect(getStarted).toHaveAttribute('href', '/docs/intro');

//   // Click the get started link.
//   await getStarted.click();
  
//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });

const REPO = 'test-repo-2';
const USER = 'astorlucas';

test.beforeAll(async ({ request }) => {
  // Create a new repository
  const response = await request.post('/user/repos', {
    data: {
      name: REPO
    }
  });
  expect(response.ok()).toBeTruthy();
});

test.afterAll(async ({ request }) => {
  // Delete the repository
  const response = await request.delete(`/repos/${USER}/${REPO}`);
  expect(response.ok()).toBeTruthy();
});

test('should create a bug report', async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Bug] report 1',
      body: 'Bug description',
    }
  });
  expect(newIssue.ok()).toBeTruthy();

  const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Bug] report 1',
    body: 'Bug description'
  }));
});

test('should create a feature request', async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Feature] request 1',
      body: 'Feature description',
    }
  });
  expect(newIssue.ok()).toBeTruthy();

  const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Feature] request 1',
    body: 'Feature description'
  }));
});

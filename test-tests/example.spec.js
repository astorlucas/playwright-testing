// @ts-check
const { test, expect } = require('@playwright/test');

//get
test("get pikachu", async ({ request, baseURL }) => {

  const _response = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
  console.log(await _response.json());


})
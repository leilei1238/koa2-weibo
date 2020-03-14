/**
 * @description test demo
 */
function sum(a, b) {
  return a + b
}
test('1+2,应该等于3', () => {
  expect(sum(1, 2)).toBe(3)
})

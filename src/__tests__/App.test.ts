import { isValidEmail } from '../Main';

test('Empty email is valid', () => {
  expect(isValidEmail('')).toBe(true);
});

test('Email with @', () => {
  expect(isValidEmail('emailaddress@email.com')).toBe(true);
});

test('Email without @', () => {
  expect(isValidEmail('emailaddressemail.com')).toBe(false);
});

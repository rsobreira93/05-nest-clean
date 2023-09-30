import { test, expect } from 'vitest';
import { Slug } from './slug';

test('It should be able to create a slug from text', () => {
  const slug = Slug.createFromText('Example question title');

  expect(slug.value).toBe('example-question-title');
});
// Parei na aula de value objects

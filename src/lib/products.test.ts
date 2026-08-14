import { describe, expect, it } from 'vitest';
import { buildAffiliateUrl, products } from './products';

describe('buildAffiliateUrl', () => {
  it('returns the original url when no affiliate tag is provided', () => {
    expect(buildAffiliateUrl('https://example.com/product', '')).toBe(
      'https://example.com/product'
    );
  });

  it('appends an affiliate tag using ? when no query string exists', () => {
    expect(buildAffiliateUrl('https://example.com/product', 'mytag-20')).toBe(
      'https://example.com/product?tag=mytag-20'
    );
  });

  it('appends an affiliate tag using & when a query string already exists', () => {
    expect(buildAffiliateUrl('https://example.com/product?foo=1', 'mytag-20')).toBe(
      'https://example.com/product?foo=1&tag=mytag-20'
    );
  });
});

describe('products', () => {
  it('loads and validates product data', () => {
    expect(products.length).toBeGreaterThan(0);
    for (const product of products) {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.url).toMatch(/^https:\/\//);
    }
  });
});

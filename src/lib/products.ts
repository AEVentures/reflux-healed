import { z } from 'zod';
import { productSchema, type Product } from '@/types/product';
import rawProducts from '@/data/products.json';

export const products: Product[] = z.array(productSchema).parse(rawProducts);

export function buildAffiliateUrl(url: string, tag: string): string {
  if (!tag) {
    return url;
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}tag=${tag}`;
}

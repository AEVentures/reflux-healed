import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('handles conditional classes', () => {
    const active = true;
    expect(cn('base', active && 'active')).toBe('base active');
  });
});

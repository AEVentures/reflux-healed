import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const links = [
  { label: 'Stories', href: '#stories' },
  { label: 'Practitioners', href: '#practitioners' },
  { label: 'Share', href: '#share' },
  { label: 'About', href: '#about' },
  { label: 'Support', href: '#support' },
  { label: 'Tools', href: '#tools' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dusk-200 bg-cream/95 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <a href="#" className="flex items-center gap-2 text-dusk-900">
          <Heart className="h-6 w-6 fill-reef-600 text-reef-600" aria-hidden="true" />
          <span className="font-display text-xl font-semibold tracking-tight">
            Reflux Healed
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-dusk-700 hover:text-reef-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-dusk-200 bg-cream px-6 pb-4 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                href={link.href}
                className="block text-sm font-medium text-dusk-700 hover:text-reef-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

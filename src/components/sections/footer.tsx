import { Heart, Github, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dusk-200 bg-dusk-900 px-6 py-12 text-dusk-100">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 fill-reef-500 text-reef-500" aria-hidden="true" />
              <span className="font-display text-xl font-semibold">{siteConfig.name}</span>
            </div>
            <p className="mt-2 max-w-sm text-sm text-dusk-300">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex gap-8 text-sm">
            <a
              href="#stories"
              className="text-dusk-300 hover:text-white"
            >
              Stories
            </a>
            <a
              href="#share"
              className="text-dusk-300 hover:text-white"
            >
              Share
            </a>
            <a
              href="#about"
              className="text-dusk-300 hover:text-white"
            >
              About
            </a>
            <a
              href="#guidelines"
              className="text-dusk-300 hover:text-white"
            >
              Guidelines
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dusk-300 hover:text-white"
              aria-label="GitHub repository"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${siteConfig.submissionEmail}`}
              className="text-dusk-300 hover:text-white"
              aria-label="Email us"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-dusk-700 pt-8 text-sm text-dusk-400">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="mt-2">
            The content on this site is for peer support and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a licensed healthcare professional before making health decisions.
          </p>
          <p className="mt-2">
            Stories are reviewed before publishing, but we cannot verify every claim. Read with discernment and talk to your care team.
          </p>
        </div>
      </div>
    </footer>
  );
}

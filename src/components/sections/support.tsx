import { Heart, Mail, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function Support() {
  const hasDonationLinks =
    siteConfig.donateOneTimeUrl !== '' || siteConfig.donateMonthlyUrl !== '';

  return (
    <section id="support" className="bg-reef-50/30 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-dusk-900 md:text-4xl">
            Support Reflux Healed
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-dusk-700">
            This site is independent, ad-free, and built by people who have lived
            with reflux. Your support keeps the community running and helps us
            add more tools, stories, and safety resources.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-dusk-200 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-reef-100">
              <Heart className="h-6 w-6 text-reef-700" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-dusk-900">
              Make a donation
            </h3>
            <p className="mt-3 text-dusk-700">
              Donations cover hosting, moderation, and the time it takes to
              verify resources. Every contribution matters.
            </p>
            {hasDonationLinks ? (
              <div className="mt-6 flex flex-wrap gap-4">
                {siteConfig.donateOneTimeUrl !== '' && (
                  <Button asChild>
                    <a
                      href={siteConfig.donateOneTimeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      One-time gift
                    </a>
                  </Button>
                )}
                {siteConfig.donateMonthlyUrl !== '' && (
                  <Button variant="outline" asChild>
                    <a
                      href={siteConfig.donateMonthlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Monthly supporter
                    </a>
                  </Button>
                )}
              </div>
            ) : (
              <div className="mt-6">
                <Button asChild variant="outline">
                  <a
                    href={`mailto:${siteConfig.supportEmail}?subject=Support Reflux Healed`}
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email us to support
                  </a>
                </Button>
                <p className="mt-3 text-sm text-dusk-500">
                  We'll reply with a secure payment link.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-dusk-200 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dusk-100">
              <ShoppingBag className="h-6 w-6 text-dusk-700" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-dusk-900">
              Shop the tools
            </h3>
            <p className="mt-3 text-dusk-700">
              Browse products the community often discusses. When available, we
              use affiliate links so a small commission supports the site at no
              extra cost to you.
            </p>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <a href="#tools">Browse tools</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

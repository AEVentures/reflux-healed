import { ExternalLink, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site';
import { products, buildAffiliateUrl } from '@/lib/products';

export function HelpfulTools() {
  return (
    <section id="tools" className="bg-cream px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold text-dusk-900 md:text-4xl">
            Helpful tools & products
          </h2>
          <p className="mt-4 text-dusk-700">
            These are items people in the reflux community frequently mention.
            They are here for convenience, not as prescriptions. Always check with
            your care team before buying or changing your routine.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="flex flex-col rounded-2xl border border-dusk-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <Badge variant="soft">{product.category}</Badge>
              <h3 className="mt-4 font-display text-xl font-semibold text-dusk-900">
                {product.name}
              </h3>
              <p className="mt-2 flex-1 text-dusk-700">{product.description}</p>
              <p className="mt-4 text-sm text-dusk-500">{product.whyMentioned}</p>
              <p className="mt-4 font-medium text-dusk-900">
                {product.priceRange}
              </p>
              <a
                href={buildAffiliateUrl(product.url, siteConfig.affiliateTag)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-reef-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-reef-800"
              >
                View on Amazon
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-reef-200 bg-reef-50/50 p-5 text-sm text-dusk-700">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-reef-700" aria-hidden="true" />
          <div>
            <p className="font-medium text-dusk-900">Affiliate & medical note</p>
            <p className="mt-1">
              Some links may be affiliate links, which means we may earn a small
              commission if you purchase — at no extra cost to you. These
              products are not medical advice, diagnosis, or treatment, and are
              not endorsed by Reflux Healed or any clinician.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

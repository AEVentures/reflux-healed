import { MapPin, Phone, Globe, Shield, ExternalLink, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { loadPractitioners } from '@/lib/practitioners';
import { type Practitioner } from '@/types/practitioner';
import { siteConfig } from '@/config/site';

const verificationLabels: Record<Practitioner['verification']['type'], string> = {
  'founder-review': 'Founder-reviewed',
  'community-report': 'Community-reported',
  'public-specialty': 'Public specialty listed',
  'paid-partner': 'Paid partner',
};

function PractitionerCard({ practitioner }: { practitioner: Practitioner }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-dusk-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-semibold text-dusk-900">
            {practitioner.name}
            {practitioner.credentials && (
              <span className="text-lg text-dusk-500">, {practitioner.credentials}</span>
            )}
          </h3>
          <p className="text-dusk-700">{practitioner.practiceName}</p>
        </div>
        <Badge variant="default" className="shrink-0">
          <Shield className="mr-1 h-3 w-3" aria-hidden="true" />
          {verificationLabels[practitioner.verification.type]}
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {practitioner.focus.map((item) => (
          <Badge key={item} variant="soft" className="capitalize">
            {item}
          </Badge>
        ))}
      </div>

      <p className="mt-5 grow leading-relaxed text-dusk-700">
        {practitioner.about}
      </p>

      <div className="mt-6 space-y-2 text-sm text-dusk-700">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-reef-600" aria-hidden="true" />
          <span>{practitioner.location}</span>
        </p>
        {practitioner.contact.phone && (
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-reef-600" aria-hidden="true" />
            <a
              href={`tel:${practitioner.contact.phone.replace(/\D/g, '')}`}
              className="hover:text-reef-700 hover:underline"
            >
              {practitioner.contact.phone}
            </a>
          </p>
        )}
        <p className="flex items-center gap-2">
          <Globe className="h-4 w-4 shrink-0 text-reef-600" aria-hidden="true" />
          <a
            href={practitioner.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-reef-700 hover:underline"
          >
            {practitioner.contact.website.replace(/^https?:\/\//, '')}
          </a>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-dusk-100 pt-5">
        <Button asChild size="sm" variant="outline">
          <a href={practitioner.contact.website} target="_blank" rel="noopener noreferrer">
            Visit site
            <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <a href={practitioner.sourceUrl} target="_blank" rel="noopener noreferrer">
            Source
          </a>
        </Button>
      </div>
    </article>
  );
}

export function Practitioners() {
  const practitioners = loadPractitioners();

  return (
    <section id="practitioners" className="bg-cream px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold text-dusk-900">
            Verified practitioners
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-dusk-600">
            Clinics and clinicians with a documented focus on hiatal hernia and reflux. This is a starting point for your own research, not a medical endorsement.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practitioners.map((practitioner) => (
            <PractitionerCard key={practitioner.id} practitioner={practitioner} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-dusk-200 bg-dusk-50/50 p-6 text-center md:p-8">
          <h3 className="font-display text-xl font-semibold text-dusk-900">
            Know a practitioner who should be here?
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-dusk-600">
            We review each suggestion to confirm the practice publicly lists reflux or hiatal hernia as a focus and has relevant credentials. We do not accept paid placement without clear disclosure.
          </p>
          <Button asChild className="mt-5" variant="outline">
            <a
              href={`mailto:${siteConfig.submissionEmail}?subject=Practitioner%20suggestion`}
            >
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              Suggest a practitioner
            </a>
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-dusk-500">
          <p>
            A “verified” listing means we were able to confirm a public specialty listing or other relevant credential. It does not mean we have independently evaluated outcomes. Always do your own due diligence and consult your care team.
          </p>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight, Users, BookOpen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section
      id="#"
      className="relative overflow-hidden bg-brand-gradient-soft px-6 pb-20 pt-16 md:pt-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-reef-200 bg-white/70 px-3 py-1 text-xs font-medium text-reef-900">
          <Shield className="h-3.5 w-3.5" aria-hidden="true" />
          Peer support. Not medical advice.
        </span>

        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-dusk-950 md:text-7xl">
          You're not alone.<br />
          <span className="gradient-text">And you're not out of options.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-dusk-700 md:text-xl">
          Reflux Healed is a community of people with <strong className="text-dusk-900">LPR, silent reflux, GERD, and hiatal hernia</strong> sharing what actually helped them — so the next person can find hope, direction, and people who understand.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#stories">
              Read stories
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <a href="#share">
              Share what helped you
            </a>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-dusk-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <Users className="h-6 w-6 text-reef-700" aria-hidden="true" />
            <h3 className="mt-3 font-display text-lg font-semibold text-dusk-900">By stage</h3>
            <p className="mt-1 text-sm text-dusk-600">
              Connect with people newly diagnosed, still investigating, actively healing, or mentoring.
            </p>
          </div>
          <div className="rounded-2xl border border-dusk-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <BookOpen className="h-6 w-6 text-reef-700" aria-hidden="true" />
            <h3 className="mt-3 font-display text-lg font-semibold text-dusk-900">What healed me</h3>
            <p className="mt-1 text-sm text-dusk-600">
              Structured, searchable recovery stories — interventions, timelines, outcomes, and honest caveats.
            </p>
          </div>
          <div className="rounded-2xl border border-dusk-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <Shield className="h-6 w-6 text-reef-700" aria-hidden="true" />
            <h3 className="mt-3 font-display text-lg font-semibold text-dusk-900">Safety first</h3>
            <p className="mt-1 text-sm text-dusk-600">
              No prescriptions, no miracle cures. Every story is personal experience, not medical advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

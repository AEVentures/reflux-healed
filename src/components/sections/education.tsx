import { Stethoscope, Moon, Shield, BookOpen, AlertCircle } from 'lucide-react';

export function Education() {
  return (
    <section id="about" className="bg-cream px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold text-dusk-900">
              What is LPR?
            </h2>
            <p className="mt-4 leading-relaxed text-dusk-700">
              <strong className="text-dusk-900">Laryngopharyngeal reflux (LPR)</strong>, sometimes called “silent reflux,” happens when stomach contents flow back up into the throat, voice box, and sometimes the nose, sinuses, or lungs. Unlike classic GERD, it often does not cause heartburn, so it can go misdiagnosed for years.
            </p>
            <p className="mt-4 leading-relaxed text-dusk-700">
              Common symptoms include hoarseness, throat clearing, a lump-in-the-throat sensation (globus), chronic cough, postnasal drip, and trouble swallowing. People with hiatal hernia, motility issues, SIBO, or sleep-disordered breathing often have reflux as one piece of a bigger puzzle.
            </p>
            <p className="mt-4 leading-relaxed text-dusk-700">
              The goal of this site is not to replace a doctor. It is to help you walk into a doctor’s office better prepared, with a clearer picture of what has helped others like you.
            </p>
          </div>

          <div className="rounded-2xl border border-dusk-200 bg-white p-8 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-dusk-900">
              Why this site exists
            </h3>
            <p className="mt-3 text-dusk-700">
              Reflux is one of the most over-simplified conditions in medicine. Many people bounce from ENT to GI to allergist to primary care, trying PPIs, elimination diets, wedges, and supplements without a clear plan.
            </p>
            <p className="mt-4 text-dusk-700">
              The real answers are scattered across patient forums, research papers, and individual specialists. This community exists to bring those answers together in one searchable, honest, safety-first place.
            </p>
            <ul className="mt-6 space-y-4 text-dusk-700">
              <li className="flex items-start gap-3">
                <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-reef-600" aria-hidden="true" />
                <span>Structured recovery stories, not scattered forum threads.</span>
              </li>
              <li className="flex items-start gap-3">
                <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-reef-600" aria-hidden="true" />
                <span>Tags for condition, symptoms, tests, and outcomes.</span>
              </li>
              <li className="flex items-start gap-3">
                <Moon className="mt-0.5 h-5 w-5 shrink-0 text-reef-600" aria-hidden="true" />
                <span>A focus on the night — when reflux does some of its worst damage.</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-reef-600" aria-hidden="true" />
                <span>Medical advice is not allowed; licensed clinicians stay central.</span>
              </li>
            </ul>
          </div>
        </div>

        <div id="guidelines" className="mt-16 rounded-2xl border border-reef-200 bg-reef-50/50 p-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-reef-700" aria-hidden="true" />
            <div>
              <h3 className="font-display text-2xl font-semibold text-dusk-900">
                Community safety & guidelines
              </h3>
              <p className="mt-2 text-dusk-700">
                This is a peer support community, not a medical practice. By sharing or reading here, you agree to the following:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-dusk-700">
                <li>No prescription or dosing recommendations. Do not tell someone to start, stop, or change a medication.</li>
                <li>No promotion of unregulated substances, peptides, supplements for sale, or “miracle cures.”</li>
                <li>Share only personal experience. If you cite research, include a source or clearly state it is your interpretation.</li>
                <li>Be kind. People here are often exhausted, in pain, and afraid. No shaming of treatment choices.</li>
                <li>Every reader must make decisions with a licensed clinician. This site does not replace professional care.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-dusk-500">
            If you are in crisis — trouble breathing, severe chest pain, vomiting blood, or inability to swallow — call emergency services or go to the nearest emergency department.
          </p>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { AlertCircle, Check, Copy, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  shareSchema,
  type ShareInput,
  type Condition,
  type Symptom,
  SUBMISSION_EMAIL,
  conditionOptions,
  stageOptions,
  symptomOptions,
  outcomeOptions,
} from '@/types/story';

const conditionLabels: Record<string, string> = {
  LPR: 'LPR',
  GERD: 'GERD',
  'silent-reflux': 'Silent reflux',
  'hiatal-hernia': 'Hiatal hernia',
  'bile-reflux': 'Bile reflux',
  'eosinophilic-esophagitis': 'Eosinophilic esophagitis',
};

const stageLabels: Record<string, string> = {
  'newly-diagnosed': 'Newly diagnosed',
  investigating: 'Investigating',
  healing: 'Healing',
  'healed-mentor': 'Healed & mentoring',
};

const symptomLabels: Record<string, string> = {
  globus: 'Globus',
  'throat-clearing': 'Throat clearing',
  'postnasal-drip': 'Postnasal drip',
  hoarseness: 'Hoarseness',
  cough: 'Cough',
  choking: 'Choking',
  heartburn: 'Heartburn',
  'chest-pain': 'Chest pain',
  nausea: 'Nausea',
  'difficulty-swallowing': 'Difficulty swallowing',
};

const outcomeLabels: Record<string, string> = {
  healed: 'Healed',
  'much-better': 'Much better',
  'somewhat-better': 'Somewhat better',
  'still-trying': 'Still trying',
};

const initialForm: ShareInput = {
  pseudonym: '',
  stage: 'newly-diagnosed',
  conditions: [],
  symptoms: [],
  yearsWithSymptoms: 0,
  headline: '',
  story: '',
  whatHelpedMost: '',
  advice: '',
  outcome: 'still-trying',
  hasMedicalSupervision: false,
  email: '',
  agreeNotMedicalAdvice: false,
};

function buildMailto(data: ShareInput): string {
  const subject = encodeURIComponent(`My Reflux Healed story: ${data.headline}`);
  const body = encodeURIComponent(
    `Pseudonym: ${data.pseudonym}\n` +
      `Stage: ${stageLabels[data.stage]}\n` +
      `Conditions: ${data.conditions.map((c) => conditionLabels[c]).join(', ')}\n` +
      `Symptoms: ${data.symptoms.map((s) => symptomLabels[s]).join(', ')}\n` +
      `Years with symptoms: ${data.yearsWithSymptoms}\n` +
      `Outcome: ${outcomeLabels[data.outcome]}\n` +
      `Under clinical supervision: ${data.hasMedicalSupervision ? 'Yes' : 'No'}\n` +
      `Email (optional): ${data.email || 'Not provided'}\n\n` +
      `--- What happened ---\n${data.story}\n\n` +
      `--- What helped most ---\n${data.whatHelpedMost}\n\n` +
      `--- Advice for someone just starting ---\n${data.advice}\n\n` +
      `I understand this is personal experience and not medical advice.`
  );
  return `mailto:${SUBMISSION_EMAIL}?subject=${subject}&body=${body}`;
}

export function ShareForm() {
  const [form, setForm] = useState<ShareInput>(initialForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [mailto, setMailto] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleCondition = (condition: Condition) => {
    setForm((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter((c) => c !== condition)
        : [...prev.conditions, condition],
    }));
  };

  const toggleSymptom = (symptom: Symptom) => {
    setForm((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const validateAndPrepare = () => {
    const result = shareSchema.safeParse(form);
    if (!result.success) {
      setErrors(result.error.errors.map((e) => e.message));
      setMailto(null);
      return;
    }
    setErrors([]);
    setMailto(buildMailto(result.data));
  };

  const copyBody = () => {
    const result = shareSchema.safeParse(form);
    if (result.success) {
      const body = buildMailto(result.data).split('&body=')[1];
      void navigator.clipboard.writeText(decodeURIComponent(body)).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <section id="share" className="bg-brand-gradient-soft px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-display text-4xl font-semibold text-dusk-900">
            Share what helped you
          </h2>
          <p className="mt-3 text-dusk-600">
            Your experience could be the thing that helps someone else make it through the night. All fields are reviewed before publishing.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-dusk-200 bg-white p-6 shadow-sm md:p-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="pseudonym" className="block text-sm font-medium text-dusk-900">
                Pseudonym
              </label>
              <input
                id="pseudonym"
                type="text"
                value={form.pseudonym}
                onChange={(e) => setForm({ ...form, pseudonym: e.target.value })}
                placeholder="What name should we publish?"
                className="mt-1.5 h-11 w-full rounded-lg border border-dusk-200 bg-cream px-4 text-dusk-900 placeholder:text-dusk-400 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="stage" className="block text-sm font-medium text-dusk-900">
                  Your stage
                </label>
                <select
                  id="stage"
                  value={form.stage}
                  onChange={(e) => setForm({ ...form, stage: e.target.value as ShareInput['stage'] })}
                  className="mt-1.5 h-11 w-full rounded-lg border border-dusk-200 bg-cream px-3 text-dusk-900 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
                >
                  {stageOptions.map((s) => (
                    <option key={s} value={s}>
                      {stageLabels[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="years" className="block text-sm font-medium text-dusk-900">
                  Years with symptoms
                </label>
                <input
                  id="years"
                  type="number"
                  min={0}
                  max={100}
                  value={form.yearsWithSymptoms}
                  onChange={(e) => setForm({ ...form, yearsWithSymptoms: Number(e.target.value) })}
                  className="mt-1.5 h-11 w-full rounded-lg border border-dusk-200 bg-cream px-4 text-dusk-900 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
                />
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-dusk-900">Conditions</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {conditionOptions.map((condition) => (
                  <button
                    key={condition}
                    type="button"
                    onClick={() => toggleCondition(condition)}
                    className={
                      form.conditions.includes(condition)
                        ? 'rounded-full bg-reef-100 px-3 py-1.5 text-sm font-medium text-reef-900 ring-1 ring-reef-300'
                        : 'rounded-full bg-dusk-100 px-3 py-1.5 text-sm font-medium text-dusk-700 hover:bg-dusk-200'
                    }
                    aria-pressed={form.conditions.includes(condition)}
                  >
                    {conditionLabels[condition]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-dusk-900">Main symptoms</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {symptomOptions.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={
                      form.symptoms.includes(symptom)
                        ? 'rounded-full bg-honey-100 px-3 py-1.5 text-sm font-medium text-honey-900 ring-1 ring-honey-300'
                        : 'rounded-full bg-dusk-100 px-3 py-1.5 text-sm font-medium text-dusk-700 hover:bg-dusk-200'
                    }
                    aria-pressed={form.symptoms.includes(symptom)}
                  >
                    {symptomLabels[symptom]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="headline" className="block text-sm font-medium text-dusk-900">
                Headline
              </label>
              <input
                id="headline"
                type="text"
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
                placeholder="e.g. After 8 years of silent reflux, I finally found my trigger"
                className="mt-1.5 h-11 w-full rounded-lg border border-dusk-200 bg-cream px-4 text-dusk-900 placeholder:text-dusk-400 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
              />
            </div>

            <div>
              <label htmlFor="story" className="block text-sm font-medium text-dusk-900">
                Your story
              </label>
              <textarea
                id="story"
                value={form.story}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
                placeholder="What did you experience? What did you try? Be honest about what didn't work, too."
                rows={5}
                className="mt-1.5 w-full rounded-lg border border-dusk-200 bg-cream p-4 text-dusk-900 placeholder:text-dusk-400 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
              />
            </div>

            <div>
              <label htmlFor="what-helped" className="block text-sm font-medium text-dusk-900">
                What helped most
              </label>
              <textarea
                id="what-helped"
                value={form.whatHelpedMost}
                onChange={(e) => setForm({ ...form, whatHelpedMost: e.target.value })}
                placeholder="Diet, medication, device, procedure, lifestyle, stress work, or something else?"
                rows={4}
                className="mt-1.5 w-full rounded-lg border border-dusk-200 bg-cream p-4 text-dusk-900 placeholder:text-dusk-400 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
              />
            </div>

            <div>
              <label htmlFor="advice" className="block text-sm font-medium text-dusk-900">
                Advice for someone just starting
              </label>
              <textarea
                id="advice"
                value={form.advice}
                onChange={(e) => setForm({ ...form, advice: e.target.value })}
                placeholder="What do you wish someone had told you on day one?"
                rows={3}
                className="mt-1.5 w-full rounded-lg border border-dusk-200 bg-cream p-4 text-dusk-900 placeholder:text-dusk-400 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="outcome" className="block text-sm font-medium text-dusk-900">
                  Outcome so far
                </label>
                <select
                  id="outcome"
                  value={form.outcome}
                  onChange={(e) => setForm({ ...form, outcome: e.target.value as ShareInput['outcome'] })}
                  className="mt-1.5 h-11 w-full rounded-lg border border-dusk-200 bg-cream px-3 text-dusk-900 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
                >
                  {outcomeOptions.map((o) => (
                    <option key={o} value={o}>
                      {outcomeLabels[o]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dusk-900">
                  Your email (optional, not published)
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="For follow-up questions only"
                  className="mt-1.5 h-11 w-full rounded-lg border border-dusk-200 bg-cream px-4 text-dusk-900 placeholder:text-dusk-400 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
                />
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-dusk-200 bg-cream p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.hasMedicalSupervision}
                  onChange={(e) => setForm({ ...form, hasMedicalSupervision: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-dusk-300 text-reef-700 focus:ring-reef-500"
                />
                <span className="text-sm text-dusk-700">
                  I was under the care of a licensed clinician while trying these interventions.
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.agreeNotMedicalAdvice}
                  onChange={(e) => setForm({ ...form, agreeNotMedicalAdvice: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-dusk-300 text-reef-700 focus:ring-reef-500"
                />
                <span className="text-sm text-dusk-700">
                  I understand this is a peer support site. My story is personal experience, not medical advice. Others should consult a licensed clinician.
                </span>
              </label>
            </div>

            {errors.length > 0 && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-900">
                <div className="flex items-center gap-2 font-medium">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  Please fix the following:
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <Button onClick={validateAndPrepare} className="w-full">
              <Send className="h-4 w-4" aria-hidden="true" />
              Prepare my story
            </Button>

            {mailto && (
              <div className="rounded-xl border border-reef-200 bg-reef-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-reef-900">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Your story is ready to send
                </div>
                <p className="mt-2 text-sm text-dusk-700">
                  Because this is a static, privacy-first first version, your story opens in your email app so our team can review it before publishing.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="w-full sm:w-auto">
                    <a href={mailto}>Open email app</a>
                  </Button>
                  <Button variant="outline" onClick={copyBody} className="w-full sm:w-auto">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" /> Copy body
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

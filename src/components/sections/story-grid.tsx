import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, PenLine } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StoryCard } from '@/components/sections/story-card';
import {
  conditionOptions,
  outcomeOptions,
  symptomOptions,
  type Story,
  type Condition,
  type Symptom,
  type Outcome,
} from '@/types/story';

interface StoryGridProps {
  stories: Story[];
}

const conditionLabels: Record<string, string> = {
  LPR: 'LPR',
  GERD: 'GERD',
  'silent-reflux': 'Silent reflux',
  'hiatal-hernia': 'Hiatal hernia',
  'bile-reflux': 'Bile reflux',
  'eosinophilic-esophagitis': 'Eosinophilic esophagitis',
};

const outcomeLabels: Record<string, string> = {
  healed: 'Healed',
  'much-better': 'Much better',
  'somewhat-better': 'Somewhat better',
  'still-trying': 'Still trying',
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

export function StoryGrid({ stories }: StoryGridProps) {
  const [search, setSearch] = useState('');
  const [conditionFilter, setConditionFilter] = useState<Condition | null>(null);
  const [outcomeFilter, setOutcomeFilter] = useState<Outcome | null>(null);
  const [symptomFilter, setSymptomFilter] = useState<Symptom | null>(null);

  const filtered = useMemo(() => {
    return stories.filter((story) => {
      const matchesSearch =
        search.length === 0 ||
        story.headline.toLowerCase().includes(search.toLowerCase()) ||
        story.story.toLowerCase().includes(search.toLowerCase()) ||
        story.pseudonym.toLowerCase().includes(search.toLowerCase());

      const matchesCondition =
        conditionFilter === null || story.conditions.includes(conditionFilter);

      const matchesOutcome =
        outcomeFilter === null || story.outcome === outcomeFilter;

      const matchesSymptom =
        symptomFilter === null || story.symptoms.includes(symptomFilter);

      return matchesSearch && matchesCondition && matchesOutcome && matchesSymptom;
    });
  }, [stories, search, conditionFilter, outcomeFilter, symptomFilter]);

  const hasActiveFilters =
    conditionFilter || outcomeFilter || symptomFilter || search;

  return (
    <section id="stories" className="bg-cream px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl font-semibold text-dusk-900">
              What helped people heal
            </h2>
            <p className="mt-2 text-dusk-600">
              Real recovery experiences, tagged by condition, symptoms, and outcome.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <a href="#share">
              <PenLine className="h-4 w-4" aria-hidden="true" />
              Share your story
            </a>
          </Button>
        </div>

        <div className="mt-8 rounded-2xl border border-dusk-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative grow">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dusk-400"
                aria-hidden="true"
              />
              <label htmlFor="story-search" className="sr-only">
                Search stories
              </label>
              <input
                id="story-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by symptom, treatment, or author..."
                className="h-11 w-full rounded-lg border border-dusk-200 bg-cream pl-10 pr-4 text-sm text-dusk-900 placeholder:text-dusk-400 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-dusk-500" aria-hidden="true" />

              <select
                aria-label="Filter by condition"
                value={conditionFilter ?? ''}
                onChange={(e) => setConditionFilter(e.target.value ? (e.target.value as Condition) : null)}
                className="h-11 rounded-lg border border-dusk-200 bg-cream px-3 text-sm text-dusk-900 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
              >
                <option value="">All conditions</option>
                {conditionOptions.map((c) => (
                  <option key={c} value={c}>
                    {conditionLabels[c]}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter by outcome"
                value={outcomeFilter ?? ''}
                onChange={(e) => setOutcomeFilter(e.target.value ? (e.target.value as Outcome) : null)}
                className="h-11 rounded-lg border border-dusk-200 bg-cream px-3 text-sm text-dusk-900 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
              >
                <option value="">All outcomes</option>
                {outcomeOptions.map((o) => (
                  <option key={o} value={o}>
                    {outcomeLabels[o]}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter by symptom"
                value={symptomFilter ?? ''}
                onChange={(e) => setSymptomFilter(e.target.value ? (e.target.value as Symptom) : null)}
                className="h-11 rounded-lg border border-dusk-200 bg-cream px-3 text-sm text-dusk-900 focus:border-reef-500 focus:outline-none focus:ring-1 focus:ring-reef-500"
              >
                <option value="">All symptoms</option>
                {symptomOptions.map((s) => (
                  <option key={s} value={s}>
                    {symptomLabels[s]}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch('');
                    setConditionFilter(null);
                    setOutcomeFilter(null);
                    setSymptomFilter(null);
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-dusk-300 bg-dusk-50/50 p-12 text-center">
            <p className="font-display text-2xl font-semibold text-dusk-900">
              No matching stories yet
            </p>
            <p className="mx-auto mt-3 max-w-lg text-dusk-600">
              This wall is still being built. Filters are working, but real stories are still being collected. Yours could be the one that helps the next person.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {conditionFilter && (
                <Badge variant="outline">Condition: {conditionLabels[conditionFilter]}</Badge>
              )}
              {outcomeFilter && (
                <Badge variant="outline">Outcome: {outcomeLabels[outcomeFilter]}</Badge>
              )}
              {symptomFilter && (
                <Badge variant="outline">Symptom: {symptomLabels[symptomFilter]}</Badge>
              )}
              {search && <Badge variant="outline">Search: {search}</Badge>}
            </div>
            <Button asChild className="mt-8">
              <a href="#share">Share your story</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

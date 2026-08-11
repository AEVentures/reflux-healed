import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Story } from '@/types/story';

const stageLabels: Record<Story['stage'], string> = {
  'newly-diagnosed': 'Newly diagnosed',
  investigating: 'Investigating',
  healing: 'Healing',
  'healed-mentor': 'Healed & mentoring',
};

const outcomeLabels: Record<Story['outcome'], string> = {
  healed: 'Healed',
  'much-better': 'Much better',
  'somewhat-better': 'Somewhat better',
  'still-trying': 'Still trying',
};

const outcomeColors: Record<Story['outcome'], 'default' | 'outline' | 'soft'> = {
  healed: 'default',
  'much-better': 'default',
  'somewhat-better': 'soft',
  'still-trying': 'outline',
};

function formatCondition(condition: string) {
  return condition
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function formatSymptom(symptom: string) {
  return symptom
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

export interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="flex flex-col rounded-2xl border border-dusk-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        {story.conditions.map((condition) => (
          <Badge key={condition} variant="outline">
            {formatCondition(condition)}
          </Badge>
        ))}
        <Badge variant={outcomeColors[story.outcome]}>
          {outcomeLabels[story.outcome]}
        </Badge>
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-dusk-900">
        {story.headline}
      </h3>

      <p className="mt-1 text-sm text-dusk-500">
        by <span className="font-medium text-dusk-800">{story.pseudonym}</span>{' '}
        · {stageLabels[story.stage]} · {story.yearsWithSymptoms} year{story.yearsWithSymptoms === 1 ? '' : 's'} with symptoms
      </p>

      <p className={cn('mt-4 text-dusk-700', expanded ? '' : 'line-clamp-3')}>
        {story.story}
      </p>

      {expanded && (
        <div className="mt-6 space-y-6 text-dusk-800">
          {story.symptoms.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-dusk-900">Symptoms</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {story.symptoms.map((symptom) => (
                  <Badge key={symptom} variant="soft">
                    {formatSymptom(symptom)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-leaf-200 bg-leaf-50/60 p-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-leaf-900">
              <Clock className="h-4 w-4" aria-hidden="true" />
              What helped most
            </h4>
            <p className="mt-2 whitespace-pre-wrap text-dusk-800">{story.whatHelpedMost}</p>
          </div>

          <div className="rounded-xl border border-honey-200 bg-honey-50/60 p-4">
            <h4 className="text-sm font-semibold text-honey-900">Advice for someone just starting</h4>
            <p className="mt-2 whitespace-pre-wrap text-dusk-800">{story.advice}</p>
          </div>

          {!story.hasMedicalSupervision && (
            <p className="text-sm text-dusk-500">
              This story is shared as personal experience. The author did not indicate clinical supervision for this protocol.
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-dusk-100 pt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-reef-700 hover:text-reef-800"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="h-4 w-4" aria-hidden="true" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>

        {story.hasMedicalSupervision && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-leaf-700">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            Supervised by a clinician
          </span>
        )}
      </div>
    </article>
  );
}

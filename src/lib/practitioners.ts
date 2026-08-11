import { practitionerSchema, type Practitioner } from '@/types/practitioner';
import rawPractitioners from '@/data/practitioners.json';

export function loadPractitioners(): Practitioner[] {
  return rawPractitioners.map((practitioner: unknown) =>
    practitionerSchema.parse(practitioner)
  );
}

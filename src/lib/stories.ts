import { storySchema, type Story } from '@/types/story';
import rawStories from '@/data/stories.json';

export function loadStories(): Story[] {
  return rawStories.map((story: unknown) => storySchema.parse(story));
}

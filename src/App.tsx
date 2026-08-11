import { Nav } from '@/components/sections/nav';
import { Hero } from '@/components/sections/hero';
import { StoryGrid } from '@/components/sections/story-grid';
import { ShareForm } from '@/components/sections/share-form';
import { Education } from '@/components/sections/education';
import { Footer } from '@/components/sections/footer';
import { loadStories } from '@/lib/stories';

export function App() {
  const stories = loadStories();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#stories" className="skip-link">
        Skip to stories
      </a>
      <Nav />
      <main>
        <Hero />
        <StoryGrid stories={stories} />
        <Education />
        <ShareForm />
      </main>
      <Footer />
    </div>
  );
}

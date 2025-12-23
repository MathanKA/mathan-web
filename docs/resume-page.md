# Resume Page Documentation

## Overview
The resume page is located at `/resume` and is built as a Server Component using Next.js App Router. It is designed to be:
- **Data-Driven**: Content is sourced from a typed data file (`src/data/resume.ts`).
- **Print-Friendly**: Optimized for printing (hides nav/footer/actions, uses clean layout).
- **Accessible**: Semantic HTML, ARIA attributes, keyboard navigation.
- **Performant**: Heavy components are minimized; animations are lightweight.

## Data Source
The single source of truth for resume content is:
- **File**: [`src/data/resume.ts`](file:///src/data/resume.ts)
- **Type**: `ResumeData` interface.

To update resume content (experience, skills, etc.), simply edit the `resumeData` object in this file. No JSX editing is required for content changes.

## Components
- **Accordion**: Used for Experience section to keep the mobile view compact.
- **Projects**: Displayed as cards. Currently data-driven from `resume.ts`.
- **TextAnimate**: Custom framer-motion wraper for header animations (`src/components/magicui/text-animate.tsx`).

## Print Styles
Print styles are handled via Tailwind's `print:` modifier.
- **Hidden elements**: Navigation, Footer, "Print/Download" buttons, External Link icons.
- **Layout**: Max-width constraints are removed (`print:max-w-none`) to use full paper width.
- **Links**: URLs are optionally displayed for print (currently customized for contact links).

## Adding New Sections
1. Update `ResumeData` interface in `src/data/resume.ts`.
2. Add data to `resumeData` object.
3. Render the new section in `src/app/resume/page.tsx`.

## Accessibility & SEO
- **JSON-LD**: Automatically generated `Person` and `ProfilePage` schema.
- **Metadata**: Next.js metadata API used for title/description/canonical.
- **Headings**: H1 > H2 > H3 hierarchy preserved.

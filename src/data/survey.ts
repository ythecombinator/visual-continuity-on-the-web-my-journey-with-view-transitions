export type QuestionType =
  | "radio"
  | "checkbox"
  | "select"
  | "text"
  | "textarea"
  | "combobox";

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  description?: string;
  required?: boolean;
  options?: QuestionOption[];
  placeholder?: string;
}

export interface SurveyStep {
  slug: string;
  title: string;
  description: string;
  questions: Question[];
}

export const surveyMeta = {
  brand: "Session Pulse",
  subtitle: "View Transitions demo",
  talkTitle: "Visual Continuity on the Web",
};

export const surveySteps: SurveyStep[] = [
  {
    slug: "pulse",
    title: "First impressions",
    description: "A quick pulse check on the session — each step is a real page load.",
    questions: [
      {
        id: "overall",
        type: "radio",
        label: "How was the overall experience?",
        description: "Think about pacing, clarity, and whether the demos landed.",
        required: true,
        options: [
          { value: "5", label: "Excellent — I want the slides" },
          { value: "4", label: "Great — a few aha moments" },
          { value: "3", label: "Solid — useful takeaways" },
          { value: "2", label: "Mixed — some parts clicked" },
          { value: "1", label: "Rough — hard to follow" },
        ],
      },
      {
        id: "recommend",
        type: "radio",
        label: "Would you recommend this session to a teammate?",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "maybe", label: "Maybe, depending on their stack" },
          { value: "no", label: "Not really" },
        ],
      },
    ],
  },
  {
    slug: "sessions",
    title: "What resonated",
    description: "Tell us which ideas stuck — multiple inputs on one document.",
    questions: [
      {
        id: "format",
        type: "select",
        label: "Which format helped you most?",
        required: true,
        options: [
          { value: "live-demo", label: "Live MPA demo" },
          { value: "shared-elements", label: "Shared-element morphs" },
          { value: "slides", label: "Slides & diagrams" },
          { value: "q-and-a", label: "Q&A" },
          { value: "hallway", label: "Chat after the talk" },
        ],
      },
      {
        id: "topics",
        type: "checkbox",
        label: "Which topics should we deepen next time?",
        description: "Pick as many as you like.",
        required: true,
        options: [
          { value: "cross-document", label: "Cross-document view transitions" },
          { value: "same-document", label: "Same-document transitions" },
          { value: "shared-elements", label: "Shared-element morphs" },
          { value: "a11y", label: "Accessibility & reduced motion" },
          { value: "fallbacks", label: "Fallbacks & browser support" },
          { value: "performance", label: "Performance & lifecycle" },
        ],
      },
      {
        id: "takeaway",
        type: "text",
        label: "One sentence takeaway",
        placeholder: "e.g. Shared names are contracts between documents…",
        required: true,
      },
    ],
  },
  {
    slug: "venue",
    title: "Around the session",
    description: "Discovery, logistics, and an open channel — still pure MPA routes.",
    questions: [
      {
        id: "highlights",
        type: "checkbox",
        label: "What worked well around the session?",
        options: [
          { value: "av", label: "A/V and stage setup" },
          { value: "schedule", label: "Schedule pacing" },
          { value: "networking", label: "Networking spaces" },
          { value: "food", label: "Food & coffee" },
          { value: "wifi", label: "Wi‑Fi reliability" },
        ],
      },
      {
        id: "discovery",
        type: "combobox",
        label: "How did you hear about this talk?",
        description: "Choose a suggestion or type your own.",
        required: true,
        placeholder: "Search or type…",
        options: [
          { value: "program", label: "Event program" },
          { value: "speaker", label: "Followed the speaker" },
          { value: "colleague", label: "Colleague recommendation" },
          { value: "social", label: "Social / community chat" },
          { value: "previous-talk", label: "Saw a previous talk" },
          { value: "random", label: "Wandered in" },
        ],
      },
      {
        id: "notes",
        type: "textarea",
        label: "Anything else we should know?",
        placeholder: "Open feedback — bugs, wishes, shout-outs…",
      },
    ],
  },
];

export function getStepBySlug(slug: string): SurveyStep | undefined {
  return surveySteps.find((step) => step.slug === slug);
}

export function getStepIndex(slug: string): number {
  return surveySteps.findIndex((step) => step.slug === slug);
}

export function getAdjacentSteps(slug: string): {
  prevHref: string | null;
  nextHref: string | null;
  isLast: boolean;
  index: number;
} {
  const index = getStepIndex(slug);
  if (index < 0) {
    return { prevHref: null, nextHref: null, isLast: false, index: -1 };
  }

  const isLast = index === surveySteps.length - 1;
  const prevHref = index === 0 ? "/" : `/steps/${surveySteps[index - 1].slug}`;
  const nextHref = isLast ? "/done" : `/steps/${surveySteps[index + 1].slug}`;

  return { prevHref, nextHref, isLast, index };
}

export function questionTransitionName(questionId: string): string {
  return `question-${questionId}`;
}

export type MockChatActionIconType = "terminal" | "read";

export type MockChatActionData = {
  id: number;
  title: string;
  codeRef?: string;
  iconType: MockChatActionIconType;
};

export const MockChatActions: MockChatActionData[] = [
  { id: 1, title: "Get current working directory", iconType: "terminal" },
  { id: 2, title: "Listed files in project root", iconType: "terminal" },
  { id: 3, title: "Read", iconType: "read" },
  { id: 4, title: "Read", codeRef: "package.json", iconType: "read" },
  { id: 5, title: "Listed source directory contents", iconType: "terminal" },
  { id: 6, title: "Read", codeRef: "src/App.tsx", iconType: "read" },
  { id: 7, title: "Read", codeRef: "src/main.tsx", iconType: "read" },
  { id: 8, title: "Read", codeRef: "src/index.css", iconType: "read" },
];

export const MockChatUserMessage = "Let's build a social media scheduling application that will handle content creation/editing/scheduling for Twitter, Bluesky, Mastodon, Threads, and LinkedIn.";

export type MockChatQuestion = {
  id: number;
  label: string;
  text: string;
};

export type MockChatPlanSection = {
  id: number;
  title: string;
  items: string[];
};

export type MockChatResponseData = {
  openingText: string;
  actionsCount: number;
  followUpText: string;
  questionsIntro: string;
  questions: MockChatQuestion[];
  planTitle: string;
  planSections: MockChatPlanSection[];
  summaryTitle: string;
  summaryText: string;
  closingText: string;
  plan: {
    title: string;
    version: string;
    createdAt: Date;
  };
};

export const MockChatResponse: MockChatResponseData = {
  openingText: "I'll analyze the current codebase and create a comprehensive plan for building a social media scheduling application. Let me start by exploring the project structure.",
  actionsCount: 9,
  followUpText: "Perfect! I now have a clear understanding of the project structure. Let me create a comprehensive plan for building a social media scheduling application.",
  questionsIntro: "Before I present the plan, I have a few clarifying questions:",
  questions: [
    {
      id: 1,
      label: "Authentication & User Management:",
      text: "Should users be able to sign up/login to manage their own accounts, or is this a single-user application?",
    },
    {
      id: 2,
      label: "OAuth Integration:",
      text: "Do you want users to connect their actual social media accounts (requiring OAuth flows for Twitter/X, LinkedIn, etc.), or should this be a \"compose and copy\" tool where users manually post the content?",
    },
    {
      id: 3,
      label: "Post Features:",
      text: "What level of post complexity should be supported - text only, or also images, videos, polls, threads, and other platform-specific features?",
    },
  ],
  planTitle: "Plan: Social Media Scheduling Application",
  planSections: [
    {
      id: 1,
      title: "Database Schema and Bolt Database Setup",
      items: [
        "Create users table for authentication and user profiles",
        "Create social_accounts table to store connected platform credentials (encrypted tokens)",
        "Create posts table with fields for content, scheduled time, status, platform targets, and metadata",
        "Create media table for storing uploaded images/videos with Bolt Database storage references",
        "Set up Row Level Security policies to ensure users only access their own data",
        "Create database functions for post scheduling and status management",
      ],
    },
    {
      id: 2,
      title: "Authentication and User Management",
      items: [
        "Build login and signup pages with email/password authentication",
        "Implement Bolt Database Auth integration for secure session management",
        "Create protected route wrapper to guard authenticated pages",
        "Build user profile page for managing account settings",
        "Add password reset and email verification flows",
      ],
    },
    {
      id: 3,
      title: "Social Platform Connection Management",
      items: [
        "Create a connections dashboard page showing all five platforms with connection status",
        "Build individual connection flows for each platform (Twitter, Bluesky, Mastodon, Threads, LinkedIn)",
        "Design platform cards with connect/disconnect buttons and account information display",
        "Implement secure token storage for OAuth credentials in Bolt Database",
        "Add reconnection handling for expired tokens",
      ],
    },
    {
      id: 4,
      title: "Content Creation Interface",
      items: [
        "Build a unified post composer with rich text editor",
        "Create character counter that adapts to each platform's limits (280 for Twitter, etc.)",
        "Add platform selector with multi-select checkboxes for cross-posting",
        "Implement media upload functionality with preview (images and videos)",
        "Add emoji picker integration",
        "Create URL shortener integration display",
        "Build post preview component showing how content appears on each selected platform",
      ],
    },
    {
      id: 5,
      title: "Scheduling System",
      items: [
        "Create date/time picker component for scheduling posts",
        "Build \"Post Now\" and \"Schedule for Later\" action buttons",
        "Implement timezone selection and display",
        "Create recurring post functionality (daily, weekly, monthly patterns)",
        "Add draft saving capability with auto-save",
        "Build schedule conflict detection and warnings",
      ],
    },
    {
      id: 6,
      title: "Content Calendar and Dashboard",
      items: [
        "Design main dashboard with overview statistics (posts scheduled, published, failed)",
        "Build calendar view showing all scheduled posts across platforms",
        "Create list view with filtering by platform, status, and date range",
        "Implement drag-and-drop rescheduling in calendar view",
        "Add quick actions for editing, duplicating, and deleting posts",
        "Build search functionality for finding past and scheduled content",
      ],
    },
    {
      id: 7,
      title: "Post Management and Queue",
      items: [
        "Create post queue page showing upcoming scheduled posts in chronological order",
        "Build individual post detail pages with edit capabilities",
        "Implement post status tracking (draft, scheduled, publishing, published, failed)",
        "Add bulk actions for managing multiple posts (delete, reschedule, duplicate)",
        "Create post history view for published content with engagement metrics placeholders",
      ],
    },
    {
      id: 8,
      title: "Platform-Specific Features",
      items: [
        "Add thread composer for Twitter/X and Bluesky with multiple connected posts",
        "Implement hashtag suggestions and trending topics display",
        "Create platform-specific content warnings and visibility settings",
        "Add alt text editor for accessibility compliance across platforms",
        "Build LinkedIn article format support for longer content",
      ],
    },
    {
      id: 9,
      title: "Notifications and Error Handling",
      items: [
        "Create notification system for post publishing confirmations",
        "Build error handling and retry logic for failed posts",
        "Add user notifications for connection expiration warnings",
        "Implement toast notifications for user actions (save, delete, publish)",
        "Create activity log showing all post-related events",
      ],
    },
    {
      id: 10,
      title: "UI Polish and Responsive Design",
      items: [
        "Design beautiful navigation with sidebar and header",
        "Create mobile-responsive layouts for all pages",
        "Build loading states and skeleton screens",
        "Add smooth transitions and animations",
        "Implement dark mode toggle (optional enhancement)",
        "Create empty states with helpful onboarding messages",
      ],
    },
  ],
  summaryTitle: "Summary",
  summaryText: "This plan creates a comprehensive social media scheduling application that allows users to compose content once and publish it across five major platforms. The architecture leverages Bolt Database for authentication, database storage, and media hosting, ensuring scalability and security. The interface will be intuitive with a calendar-based scheduling system, real-time previews, and platform-specific optimizations. Users can manage multiple social accounts, schedule posts in advance, and track their content pipeline from a unified dashboard.",
  closingText: "Please answer the three questions above so I can refine the plan to match your exact requirements. Once you're ready to proceed, click the \"Implement this plan\" button to switch to build mode.",
  plan: {
    title: "Create Social Scheduler Plan",
    version: "Version 1",
    createdAt: new Date("2026-03-29T13:36:00"),
  },
};

import ChatPlan from "./ChatPlan";
import ChatActions from "./ChatActions";

type ChatResponseProps = {
  actionsExpanded: boolean;
  actionOnClick: () => void;
}

export default function ChatResponse(props: ChatResponseProps) {
  return (
    <>
      <p>I'll analyze the current codebase and create a comprehensive plan for building a social media scheduling application. Let me start by exploring the project structure.</p>

      <ChatActions count={9} actionsExpanded={props.actionsExpanded} actionOnClick={props.actionOnClick} />

      <p>Perfect! I now have a clear understanding of the project structure. Let me create a comprehensive plan for building a social media scheduling application.</p>

      <p>Before I present the plan, I have a few clarifying questions:</p>

      <ol className="list-decimal list-outside pl-6 space-y-3">
        <li><strong>Authentication & User Management:</strong> Should users be able to sign up/login to manage their own accounts, or is this a single-user application?</li>
        <li><strong>OAuth Integration:</strong> Do you want users to connect their actual social media accounts (requiring OAuth flows for Twitter/X, LinkedIn, etc.), or should this be a "compose and copy" tool where users manually post the content?</li>
        <li><strong>Post Features:</strong> What level of post complexity should be supported - text only, or also images, videos, polls, threads, and other platform-specific features?</li>
      </ol>

      <hr className="border-2 border-gray-200 my-3" />

      <h2 className="text-lg font-semibold">Plan: Social Media Scheduling Application</h2>
      
      <ol className="space-y-5">
        <li>
          <h3 className="text-md font-semibold">1. Database Schema and Bolt Database Setup</h3>

          <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
            <li>Create users table for authentication and user profiles</li>
            <li>Create social_accounts table to store connected platform credentials (encrypted tokens)</li>
            <li>Create posts table with fields for content, scheduled time, status, platform targets, and metadata</li>
            <li>Create media table for storing uploaded images/videos with Bolt Database storage references</li>
            <li>Set up Row Level Security policies to ensure users only access their own data</li>
            <li>Create database functions for post scheduling and status management</li>
          </ul>
        </li>

        <li>
          <h3 className="text-md font-semibold">2. Authentication and User Management</h3>

          <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
            <li>Build login and signup pages with email/password authentication</li>
            <li>Implement Bolt Database Auth integration for secure session management</li>
            <li>Create protected route wrapper to guard authenticated pages</li>
            <li>Build user profile page for managing account settings</li>
            <li>Add password reset and email verification flows</li>
          </ul>
        </li>

        <li>
          <h3 className="text-md font-semibold">3. Social Platform Connection Management</h3>

          <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
            <li>Create a connections dashboard page showing all five platforms with connection status</li>
            <li>Build individual connection flows for each platform (Twitter, Bluesky, Mastodon, Threads, LinkedIn)</li>
            <li>Design platform cards with connect/disconnect buttons and account information display</li>
            <li>Implement secure token storage for OAuth credentials in Bolt Database</li>
            <li>Add reconnection handling for expired tokens</li>
          </ul>
        </li>

        <li>
          <h3 className="text-md font-semibold">4. Content Creation Interface</h3>

          <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
            <li>Build a unified post composer with rich text editor</li>
            <li>Create character counter that adapts to each platform's limits (280 for Twitter, etc.)</li>
            <li>Add platform selector with multi-select checkboxes for cross-posting</li>
            <li>Implement media upload functionality with preview (images and videos)</li>
            <li>Add emoji picker integration</li>
            <li>Create URL shortener integration display</li>
            <li>Build post preview component showing how content appears on each selected platform</li>
          </ul>
        </li>

        <li>
          <h3 className="text-md font-semibold">5. Scheduling System</h3>

          <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
            <li>Create date/time picker component for scheduling posts</li>
            <li>Build "Post Now" and "Schedule for Later" action buttons</li>
            <li>Implement timezone selection and display</li>
            <li>Create recurring post functionality (daily, weekly, monthly patterns)</li>
            <li>Add draft saving capability with auto-save</li>
            <li>Build schedule conflict detection and warnings</li>
          </ul>
        </li>

        <li>
          <h3 className="text-md font-semibold">6. Content Calendar and Dashboard</h3>

          <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
            <li>Design main dashboard with overview statistics (posts scheduled, published, failed)</li>
            <li>Build calendar view showing all scheduled posts across platforms</li>
            <li>Create list view with filtering by platform, status, and date range</li>
            <li>Implement drag-and-drop rescheduling in calendar view</li>
            <li>Add quick actions for editing, duplicating, and deleting posts</li>
            <li>Build search functionality for finding past and scheduled content</li>
          </ul>
        </li>

        <li>
          <h3 className="text-md font-semibold">7. Post Management and Queue</h3>

          <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
            <li>Create post queue page showing upcoming scheduled posts in chronological order</li>
            <li>Build individual post detail pages with edit capabilities</li>
            <li>Implement post status tracking (draft, scheduled, publishing, published, failed)</li>
            <li>Add bulk actions for managing multiple posts (delete, reschedule, duplicate)</li>
            <li>Create post history view for published content with engagement metrics placeholders</li>
          </ul>
        </li>

        <li>
          <h3 className="text-md font-semibold">8. Platform-Specific Features</h3>

          <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
            <li>Add thread composer for Twitter/X and Bluesky with multiple connected posts</li>
            <li>Implement hashtag suggestions and trending topics display</li>
            <li>Create platform-specific content warnings and visibility settings</li>
            <li>Add alt text editor for accessibility compliance across platforms</li>
            <li>Build LinkedIn article format support for longer content</li>
          </ul>
        </li>

        <li>
          <h3 className="text-md font-semibold">9. Notifications and Error Handling</h3>

          <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
            <li>Create notification system for post publishing confirmations</li>
            <li>Build error handling and retry logic for failed posts</li>
            <li>Add user notifications for connection expiration warnings</li>
            <li>Implement toast notifications for user actions (save, delete, publish)</li>
            <li>Create activity log showing all post-related events</li>
          </ul>
        </li>

        <li>
          <h3 className="text-md font-semibold">10. UI Polish and Responsive Design</h3>

          <ul className="list-disc list-outside space-y-3 pl-6 mt-3"> 
            <li>Design beautiful navigation with sidebar and header</li>
            <li>Create mobile-responsive layouts for all pages</li>
            <li>Build loading states and skeleton screens</li>
            <li>Add smooth transitions and animations</li>
            <li>Implement dark mode toggle (optional enhancement)</li>
            <li>Create empty states with helpful onboarding messages</li>
          </ul>
        </li>
      </ol>

      <hr className="border-2 border-gray-200 my-3" />

      <h2 className="text-lg font-semibold">Summary</h2>

      <p>This plan creates a comprehensive social media scheduling application that allows users to compose content once and publish it across five major platforms. The architecture leverages Bolt Database for authentication, database storage, and media hosting, ensuring scalability and security. The interface will be intuitive with a calendar-based scheduling system, real-time previews, and platform-specific optimizations. Users can manage multiple social accounts, schedule posts in advance, and track their content pipeline from a unified dashboard.</p>

      <p>Please answer the three questions above so I can refine the plan to match your exact requirements. Once you're ready to proceed, click the "Implement this plan" button to switch to build mode.</p>

      <ChatPlan />
    </>
  );
}
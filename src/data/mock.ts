// Conversations
type Conversation = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export const conversations: Conversation[] = [
  {
    id: 1,
    title: "The basics of TypeScript",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: "The basics of React",
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Projects
type Project = {
  id: number;
  title: string;
  private: boolean;
  created_at: Date;
  updated_at: Date;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Multi-Platform Social Scheduler",
    private: true,
    created_at: new Date(),
    updated_at: new Date()
  }
]

export const currentProject = projects[0];

// Teams
export type Team = {
  id: number;
  title: string;
  type?: "Personal" | "Pro" | "Team" | "Enterprise";
  icon?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const teams: Team[] = [
  {
    id: 1,
    title: "Keenan Payne",
    type: "Personal",
    icon: "/me.jpg",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    title: "Concise CSS",
    type: "Team",
    icon: "/concise.png",
    created_at: new Date(),
    updated_at: new Date()
  }
]
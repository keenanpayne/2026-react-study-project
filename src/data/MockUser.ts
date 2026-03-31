// Projects
export type MockUserProject = {
  id: number
  title: string
  private: boolean
  created_at: Date
  updated_at: Date
}

export const MockUserProjects: MockUserProject[] = [
  {
    id: 1,
    title: 'Multi-Platform Social Scheduler',
    private: true,
    created_at: new Date('2026-03-10'),
    updated_at: new Date('2026-03-28'),
  },
  {
    id: 2,
    title: 'Learning Management Platform',
    private: false,
    created_at: new Date('2025-05-02'),
    updated_at: new Date('2025-05-18'),
  },
  {
    id: 3,
    title: 'Inspiration Gallery',
    private: true,
    created_at: new Date('2025-04-08'),
    updated_at: new Date('2025-04-22'),
  },
]

export const MockUserCurrentProject: MockUserProject = MockUserProjects[0]

// Teams
export type MockUserTeam = {
  id: number
  title: string
  type?: 'Personal' | 'Pro' | 'Team' | 'Enterprise'
  icon?: string
  created_at?: Date
  updated_at?: Date
}

export const MockUserTeams: MockUserTeam[] = [
  {
    id: 1,
    title: 'Keenan Payne',
    type: 'Personal',
    icon: '/me.jpg',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    title: 'Concise CSS',
    type: 'Team',
    icon: '/concise.png',
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Bolt Tokens
export const MockUserBoltTokens = 300000

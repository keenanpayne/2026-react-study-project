export type MockUserProject = {
  id: number
  title: string
  private: boolean
  created_at: Date
  updated_at: Date
}

export type MockUserTeam = {
  id: number
  title: string
  type?: 'Personal' | 'Pro' | 'Team' | 'Enterprise'
  icon?: string
  active?: boolean
  created_at?: Date
  updated_at?: Date
}

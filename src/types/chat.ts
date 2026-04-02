export type ChatActionIconType = 'terminal' | 'read'

export type ChatActionData = {
  id: number
  title: string
  codeRef?: string
  iconType: ChatActionIconType
}

export type ChatQuestion = {
  id: number
  label: string
  text: string
}

export type ChatPlanSection = {
  id: number
  title: string
  items: string[]
}

export type ChatResponseData = {
  openingText: string
  followUpText: string
  questionsIntro: string
  questions: ChatQuestion[]
  planTitle: string
  planSections: ChatPlanSection[]
  summaryTitle: string
  summaryText: string
  closingText: string
  plan: {
    title: string
    version: string
    createdAt: Date
  }
}

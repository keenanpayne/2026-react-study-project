export type ChatActionIconType = 'terminal' | 'read'

export type ChatActionData = {
  id: number
  title: string
  codeRef?: string
  iconType: ChatActionIconType
  isLoading?: boolean
}

export type ChatQuestionAnswerType =
  | 'text'
  | 'single-select'
  | 'multi-select'
  | 'image-upload'

export type ChatQuestionOption = {
  id: string
  label: string
  description?: string
}

export type ChatQuestion = {
  id: number
  label: string
  text: string
  answerType: ChatQuestionAnswerType
  options?: ChatQuestionOption[]
  placeholder?: string
  allowSkip?: boolean
}

export type ChatQuestionAnswerValue =
  | string
  | string[]
  | {
      fileName: string
      fileSize: number
      fileType: string
    }

export type ChatQuestionAnswer = {
  questionId: number
  status: 'answered' | 'skipped'
  value?: ChatQuestionAnswerValue
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

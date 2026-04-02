import type { MockWorkbenchFileTreeItemType } from '~/types/workbench'

export type MockWorkbenchDatabaseTable = {
  id: number
  type: MockWorkbenchFileTreeItemType
  name: string
  created_at: Date
  updated_at: Date
  children?: MockWorkbenchDatabaseRow[]
  selected?: boolean
}

export type MockWorkbenchDatabaseRow = {
  id: number
  type: MockWorkbenchFileTreeItemType
  name: string
  created_at: Date
  updated_at: Date
  children?: MockWorkbenchDatabaseColumn[]
  expandable?: boolean
  selected?: boolean
}

export type MockWorkbenchDatabaseColumn = {
  id: number
  type: MockWorkbenchFileTreeItemType
  name: string
  value: string | number | null
  created_at: Date
  updated_at: Date
}

export const MockWorkbenchDatabaseTables: MockWorkbenchDatabaseTable[] = [
  {
    id: 1,
    name: 'users',
    type: 'table',
    created_at: new Date('2025-11-23T19:10:02.578Z'),
    updated_at: new Date('2025-11-23T19:10:02.578Z'),
    children: [
      {
        id: 1,
        type: 'row',
        expandable: false,
        name: 'Keenan Payne',
        created_at: new Date('2025-11-23T19:10:02.578Z'),
        updated_at: new Date('2025-11-23T19:10:02.578Z'),
        children: [
          {
            id: 1,
            type: 'column',
            name: 'id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
          {
            id: 2,
            type: 'column',
            name: 'email',
            value: 'keenan@example.com',
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
          {
            id: 3,
            type: 'column',
            name: 'full_name',
            value: 'Keenan Payne',
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
          {
            id: 4,
            type: 'column',
            name: 'timezone',
            value: 'America/Los_Angeles',
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
          {
            id: 5,
            type: 'column',
            name: 'created_at',
            value: '2025-11-23T19:10:02.578Z',
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
          {
            id: 6,
            type: 'column',
            name: 'updated_at',
            value: '2025-11-23T19:10:02.578Z',
            created_at: new Date('2025-11-23T19:10:02.578Z'),
            updated_at: new Date('2025-11-23T19:10:02.578Z'),
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'social_accounts',
    type: 'table',
    created_at: new Date('2025-11-23T19:10:02.578Z'),
    updated_at: new Date('2025-11-23T19:10:02.578Z'),
    children: [],
  },
  {
    id: 3,
    name: 'posts',
    type: 'table',
    created_at: new Date('2025-11-23T19:10:58.705Z'),
    updated_at: new Date('2025-11-23T19:10:58.705Z'),
    children: [
      {
        id: 1,
        type: 'row',
        expandable: false,
        name: "This is what I'm thinking about",
        created_at: new Date('2025-11-23T19:10:58.705Z'),
        updated_at: new Date('2025-11-23T19:10:58.705Z'),
        children: [
          {
            id: 1,
            type: 'column',
            name: 'id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 2,
            type: 'column',
            name: 'user_id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 3,
            type: 'column',
            name: 'content',
            value: "This is what I'm thinking about",
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 4,
            type: 'column',
            name: 'status',
            value: 'draft',
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 5,
            type: 'column',
            name: 'scheduled_at',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 6,
            type: 'column',
            name: 'published_at',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 7,
            type: 'column',
            name: 'error_message',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 8,
            type: 'column',
            name: 'is_thread',
            value: 'false',
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 9,
            type: 'column',
            name: 'thread_order',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 10,
            type: 'column',
            name: 'thread_parent_id',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 11,
            type: 'column',
            name: 'created_at',
            value: '2025-11-23T19:10:58.705Z',
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
          {
            id: 12,
            type: 'column',
            name: 'updated_at',
            value: '2025-11-23T19:10:58.705Z',
            created_at: new Date('2025-11-23T19:10:58.705Z'),
            updated_at: new Date('2025-11-23T19:10:58.705Z'),
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'post_platforms',
    type: 'table',
    created_at: new Date('2025-11-23T19:10:58.814Z'),
    updated_at: new Date('2025-11-23T19:10:58.905Z'),
    children: [
      {
        id: 1,
        type: 'row',
        expandable: false,
        name: 'twitter',
        created_at: new Date('2025-11-23T19:10:58.814Z'),
        updated_at: new Date('2025-11-23T19:10:58.814Z'),
        children: [
          {
            id: 1,
            type: 'column',
            name: 'id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 2,
            type: 'column',
            name: 'post_id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 3,
            type: 'column',
            name: 'platform',
            value: 'twitter',
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 4,
            type: 'column',
            name: 'platform_post_id',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 5,
            type: 'column',
            name: 'status',
            value: 'pending',
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 6,
            type: 'column',
            name: 'error_message',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
          {
            id: 7,
            type: 'column',
            name: 'created_at',
            value: '2025-11-23T19:10:58.814Z',
            created_at: new Date('2025-11-23T19:10:58.814Z'),
            updated_at: new Date('2025-11-23T19:10:58.814Z'),
          },
        ],
      },
      {
        id: 2,
        type: 'row',
        expandable: false,
        name: 'bluesky',
        created_at: new Date('2025-11-23T19:10:58.905Z'),
        updated_at: new Date('2025-11-23T19:10:58.905Z'),
        children: [
          {
            id: 1,
            type: 'column',
            name: 'id',
            value: 2,
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 2,
            type: 'column',
            name: 'post_id',
            value: 1,
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 3,
            type: 'column',
            name: 'platform',
            value: 'bluesky',
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 4,
            type: 'column',
            name: 'platform_post_id',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 5,
            type: 'column',
            name: 'status',
            value: 'pending',
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 6,
            type: 'column',
            name: 'error_message',
            value: null,
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
          {
            id: 7,
            type: 'column',
            name: 'created_at',
            value: '2025-11-23T19:10:58.905Z',
            created_at: new Date('2025-11-23T19:10:58.905Z'),
            updated_at: new Date('2025-11-23T19:10:58.905Z'),
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'post_media',
    type: 'table',
    created_at: new Date('2025-11-23T19:10:02.578Z'),
    updated_at: new Date('2025-11-23T19:10:02.578Z'),
    children: [],
  },
]

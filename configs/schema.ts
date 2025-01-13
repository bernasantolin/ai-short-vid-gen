import { pgTable, serial, varchar, json, boolean, jsonb  } from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    imageUrl: varchar('imageUrl'),
    subscription: boolean('subscription').default(false)
})

export const VideoData = pgTable('videoData', {
    id:serial('id').primaryKey(),
    script: jsonb('script').$type<{ contentText: string;  imagePrompt: string; }[]>().notNull(),
    audioFileUrl: varchar('audiofileUrl').notNull(),
    captions: jsonb('captions').$type<{end: number; text: string;  start: number;  speaker: string; }[]>().notNull(),
    imageList: varchar('imageList').array(),
    createdBy: varchar('createdBy').notNull()
})

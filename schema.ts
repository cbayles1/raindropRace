import { pgTable, serial, varchar, integer, boolean} from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    user_id: serial('user_id').primaryKey(),
    turtle_id: integer('turtle_id'),
    display_name: varchar('display_name', {length: 20}).notNull().unique(),
    wins: integer('wins').notNull(),
    has_voted: boolean('has_voted').notNull()
});

export const turtles = pgTable('turtles', {
    turtle_id: serial('turtle_id').primaryKey(),
    votes: integer('votes').notNull(),
    is_winner: boolean('is_winner').notNull(),
    position: integer('position').notNull(),
    velocity: integer('velocity').notNull()
});

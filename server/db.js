import { Client } from 'pg';
export const client = new Client({ssl:true});
client.connect();
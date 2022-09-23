import { readFile, writeFile, appendFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { purgeList } from './helpers.mjs';
const sessionsPath = join(process.cwd(), 'data', 'cms', 'sessions.txt');
const blogDir = join(process.cwd(), 'data', 'blog');

export async function readSessions() {
  const strings = await readFile(sessionsPath, { encoding: 'utf8' });
  const sessions = strings.split("\n");
  return sessions;
}

export function login(session) {
  return appendFile(sessionsPath, "\n" + session + "\n", { encoding: 'utf8' });
}

// Delete all sessions with base64-encoded email
export function logout(emailBase64, sessions) {
  return writeFile(sessionsPath, purgeList(emailBase64, sessions).join('\n'), {
    encoding: 'utf8'
  });
}

export async function listPosts() {
  return readdir(blogDir);
}

export async function getPostBySlug(fileName) {
  return readFile(join(blogDir, fileName), { encoding: 'utf8' });
} 

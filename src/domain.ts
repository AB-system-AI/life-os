import { z } from 'zod'

export const taskSchema = z.object({ id: z.string().min(1), title: z.string().trim().min(1).max(240), time: z.string().max(40).default('Anytime'), done: z.boolean().default(false), tag: z.string().max(60).default('Personal'), dueDate: z.string().date().optional(), createdAt: z.string().datetime().optional() })
export const habitSchema = z.object({ id: z.string().min(1), title: z.string().trim().min(1).max(120), icon: z.string().max(8).default('◉'), done: z.boolean().default(false), completedDates: z.array(z.string().date()).default([]) })
export const recordSchema = z.object({ id: z.string().min(1), title: z.string().trim().min(1).max(200), notes: z.string().max(10000).default(''), createdAt: z.string().datetime(), updatedAt: z.string().datetime() })
export const lifeDataSchema = z.object({ schemaVersion: z.literal(2), name: z.string().trim().min(1).max(80), tasks: z.array(taskSchema).max(10000), habits: z.array(habitSchema).max(1000), records: z.record(z.string(), z.array(recordSchema)).default({}) })
export type Task = z.infer<typeof taskSchema>
export type Habit = z.infer<typeof habitSchema>
export type LifeData = z.infer<typeof lifeDataSchema>
export type ModuleKey = 'education' | 'career' | 'finance' | 'journal' | 'spiritual' | 'wellness' | 'goals' | 'projects' | 'calendar'
export const moduleKeys: ModuleKey[] = ['education', 'career', 'finance', 'journal', 'spiritual', 'wellness', 'goals', 'projects', 'calendar']
export const emptyData: LifeData = { schemaVersion: 2, name: 'Your name', tasks: [], habits: [], records: Object.fromEntries(moduleKeys.map(key => [key, []])) }
export class StorageError extends Error { constructor(message: string) { super(message); this.name = 'StorageError' } }
export function migrateData(input: unknown): LifeData {
  if (typeof input === 'object' && input !== null && 'schemaVersion' in input && (input as { schemaVersion?: unknown }).schemaVersion === 2) return lifeDataSchema.parse(input)
  if (typeof input === 'object' && input !== null) {
    const old = input as { name?: unknown; tasks?: unknown; habits?: unknown }
    const migrated = { ...emptyData, name: typeof old.name === 'string' && old.name.trim() ? old.name : emptyData.name, tasks: Array.isArray(old.tasks) ? old.tasks.map(task => ({ ...(task as object), createdAt: new Date().toISOString() })) : [], habits: Array.isArray(old.habits) ? old.habits.map(habit => ({ ...(habit as object), completedDates: (habit as { done?: boolean }).done ? [new Date().toISOString().slice(0, 10)] : [] })) : [] }
    return lifeDataSchema.parse(migrated)
  }
  throw new StorageError('Saved data is not a valid LIFE OS data object.')
}
const DATA_KEY = 'life-os-data-v1'
export function loadData(storage: Pick<Storage, 'getItem' | 'setItem'>): LifeData {
  let raw: string | null
  try { raw = storage.getItem(DATA_KEY) } catch { throw new StorageError('Browser storage is unavailable. Your data could not be loaded.') }
  if (!raw) return emptyData
  try { const data = migrateData(JSON.parse(raw)); storage.setItem(DATA_KEY, JSON.stringify(data)); return data }
  catch { throw new StorageError('Saved LIFE OS data is invalid. Export is unavailable, and the original data was left untouched.') }
}
export function saveData(storage: Pick<Storage, 'setItem'>, value: unknown): LifeData {
  const data = lifeDataSchema.parse(value)
  try { storage.setItem(DATA_KEY, JSON.stringify(data)) } catch { throw new StorageError('Could not save data. Browser storage may be full or unavailable.') }
  return data
}
export function makeBackup(data: LifeData, now = new Date()): string { return JSON.stringify({ app: 'LIFE OS', backupVersion: 1, exportedAt: now.toISOString(), data }, null, 2) }
export function parseBackup(raw: string): LifeData {
  if (raw.length > 10_000_000) throw new StorageError('Backup exceeds the 10 MB import limit.')
  let backup: unknown
  try { backup = JSON.parse(raw) } catch { throw new StorageError('Backup is not valid JSON.') }
  const wrapper = z.object({ app: z.literal('LIFE OS'), backupVersion: z.literal(1), exportedAt: z.string().datetime(), data: lifeDataSchema }).safeParse(backup)
  if (!wrapper.success) throw new StorageError('Backup format or data integrity check failed. Existing data was not changed.')
  return wrapper.data.data
}
export function calculateGpa(items: { gradePoints: number; credits: number }[]): number { const total = items.reduce((sum, item) => sum + item.credits, 0); if (!items.length || items.some(item => !Number.isFinite(item.gradePoints) || !Number.isFinite(item.credits) || item.credits <= 0 || item.gradePoints < 0)) throw new Error('Enter valid grade points and positive credit hours.'); return Math.round(items.reduce((sum, item) => sum + item.gradePoints * item.credits, 0) / total * 100) / 100 }
export function calculateBudget(transactions: { amountMinor: number; kind: 'income' | 'expense' }[]): { incomeMinor: number; expenseMinor: number; balanceMinor: number } { const incomeMinor = transactions.filter(t => t.kind === 'income').reduce((sum, t) => sum + t.amountMinor, 0); const expenseMinor = transactions.filter(t => t.kind === 'expense').reduce((sum, t) => sum + t.amountMinor, 0); if (transactions.some(t => !Number.isSafeInteger(t.amountMinor) || t.amountMinor < 0)) throw new Error('Amounts must be non-negative integer minor units.'); return { incomeMinor, expenseMinor, balanceMinor: incomeMinor - expenseMinor } }
export function calculateGoalProgress(milestones: { done: boolean }[]): number { return milestones.length ? Math.round(milestones.filter(item => item.done).length / milestones.length * 100) : 0 }
export function searchRecords(data: LifeData, query: string): { module: string; record: Task | Habit | z.infer<typeof recordSchema> }[] { const q = query.trim().toLocaleLowerCase(); if (!q) return []; return [...data.tasks.filter(x => x.title.toLocaleLowerCase().includes(q)).map(record => ({ module: 'tasks', record })), ...data.habits.filter(x => x.title.toLocaleLowerCase().includes(q)).map(record => ({ module: 'habits', record })), ...Object.entries(data.records).flatMap(([module, items]) => items.filter(x => `${x.title} ${x.notes}`.toLocaleLowerCase().includes(q)).map(record => ({ module, record })))] }

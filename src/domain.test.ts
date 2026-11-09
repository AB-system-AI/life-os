import { describe, expect, it } from 'vitest'
import { calculateBudget, calculateGpa, calculateGoalProgress, emptyData, loadData, makeBackup, parseBackup, saveData, searchRecords, StorageError } from './domain'

function memoryStorage(initial: Record<string, string> = {}) {
  const map = new Map(Object.entries(initial))
  return { getItem: (key: string) => map.get(key) ?? null, setItem: (key: string, value: string) => { map.set(key, value) }, map }
}
describe('versioned persistence', () => {
  it('migrates v1 without losing tasks and saves the new version', () => {
    const storage = memoryStorage({ 'life-os-data-v1': JSON.stringify({ name: 'Ana', tasks: [{ id: 't', title: 'Study', time: 'Anytime', done: false, tag: 'Uni' }], habits: [] }) })
    expect(loadData(storage).schemaVersion).toBe(2)
    expect(loadData(storage).tasks[0].title).toBe('Study')
    expect(JSON.parse(storage.map.get('life-os-data-v1')!).schemaVersion).toBe(2)
  })
  it('does not overwrite corrupted persisted data', () => {
    const raw = '{bad'
    const storage = memoryStorage({ 'life-os-data-v1': raw })
    expect(() => loadData(storage)).toThrow(StorageError)
    expect(storage.map.get('life-os-data-v1')).toBe(raw)
  })
  it('validates on save and preserves data across reloads', () => {
    const storage = memoryStorage()
    const data = { ...emptyData, tasks: [{ id: '1', title: 'Plan', time: 'Anytime', done: false, tag: 'Work' }] }
    saveData(storage, data)
    expect(loadData(storage).tasks).toHaveLength(1)
    expect(() => saveData(storage, { ...data, tasks: [{ ...data.tasks[0], title: '' }] })).toThrow()
  })
})
describe('backup integrity', () => {
  it('round trips a backup and rejects corrupted data', () => {
    const json = makeBackup(emptyData)
    expect(parseBackup(json)).toEqual(emptyData)
    expect(() => parseBackup('{"app":"LIFE OS","backupVersion":1,"exportedAt":"2025-01-01T00:00:00.000Z","data":{"oops":true}}')).toThrow(StorageError)
    expect(() => parseBackup('not json')).toThrow(StorageError)
  })
})
describe('domain calculations and search', () => {
  it('calculates weighted GPA', () => { expect(calculateGpa([{ gradePoints: 4, credits: 3 }, { gradePoints: 3, credits: 1 }])).toBe(3.75) })
  it('uses integer minor units for financial totals', () => { expect(calculateBudget([{ amountMinor: 10001, kind: 'income' }, { amountMinor: 1999, kind: 'expense' }])).toEqual({ incomeMinor: 10001, expenseMinor: 1999, balanceMinor: 8002 }) })
  it('calculates milestone progress and searches records across modules', () => {
    expect(calculateGoalProgress([{ done: true }, { done: false }])).toBe(50)
    const data = { ...emptyData, records: { journal: [{ id: '1', title: 'Idea', notes: 'Garden', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }] } }
    expect(searchRecords(data, 'garden')).toHaveLength(1)
  })
})

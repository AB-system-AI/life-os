import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

afterEach(() => { cleanup(); localStorage.clear(); document.documentElement.dataset.theme = '' })
describe('LIFE OS app flows', () => {
  it('creates, completes, and retains a task after remount', async () => {
    const user = userEvent.setup()
    const first = render(<App />)
    await user.click(screen.getAllByRole('button', { name: /Add task/i })[0])
    await user.type(screen.getByLabelText('Title'), 'Call the university')
    await user.click(screen.getByRole('button', { name: /Save/i }))
    expect(screen.getByText('Call the university')).toBeTruthy()
    const row = screen.getByText('Call the university').closest('.task-row')!
    await user.click(within(row as HTMLElement).getByRole('button', { name: 'Complete Call the university' }))
    first.unmount()
    render(<App />)
    expect(screen.getByText('Call the university')).toBeTruthy()
    expect(screen.getByText('100')).toBeTruthy()
  })
  it('switches language and sets RTL direction', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'العربية' }))
    expect(document.documentElement.dir).toBe('rtl')
    expect(screen.getByRole('main').closest('[dir="rtl"]') !== null).toBe(true)
  })
  it('creates and deletes a module record', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /Education/i }))
    await user.click(screen.getByRole('button', { name: /Add record/i }))
    await user.type(screen.getByLabelText('Title'), 'Calculus')
    await user.click(screen.getByRole('button', { name: /Save/i }))
    expect(screen.getByText(/Calculus/)).toBeTruthy()
    window.confirm = () => true
    await user.click(screen.getByRole('button', { name: /Delete Calculus/ }))
    expect(screen.queryByText(/Calculus/)).toBeNull()
  })
  it('exports and restores a backup without accepting corruption', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getAllByRole('button', { name: /Settings/i })[0])
    const backup = localStorage.getItem('life-os-data-v1')
    expect(backup).toBeTruthy()
    const { makeBackup } = await import('./domain')
    const valid = new File([makeBackup(JSON.parse(backup!) as never)], 'backup.json', { type: 'application/json' })
    const input = screen.getByLabelText(/Restore/i) as HTMLInputElement
    await user.upload(input, valid)
    expect(screen.queryByRole('alert')).toBeNull()
    const invalid = new File(['not json'], 'broken.json', { type: 'application/json' })
    await user.upload(input, invalid)
    expect(await screen.findByRole('alert')).toBeTruthy()
  })
})

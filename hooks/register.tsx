import type { EngineInterface, Register } from 'claude-code'

import { LOOK, problems } from './look'

const COMMAND = 'clone-eva'
// Holds 'off' once the person turns the look off; absent, the look is on. Kept across sessions.
const OFF_KEY = 'off'

async function isOn($: EngineInterface): Promise<boolean> {
  try {
    return (await $.store.get(OFF_KEY)) !== 'off'
  } catch {
    return true
  }
}

async function turnOn($: EngineInterface): Promise<string> {
  const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

  if (unpainted !== undefined) {
    return `Clone Eva could not be painted: ${unpainted}`
  }

  const set = await $.theme.set(LOOK)

  return set.isDrawn ? 'Clone Eva is on.' : `Clone Eva is on, but nothing draws it here: ${set.reason}`
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    try {
      await $.command.register({
        name: COMMAND,
        description: 'The Eva Dark look behind the chat: "on" turns it on, "off" turns it off.',
      })
    } catch (error) {
      void $.ui.toast(`clone-eva: /${COMMAND} is not available (${String(error)})`)
    }

    if (await isOn($)) {
      try {
        await turnOn($)
      } catch (error) {
        void $.ui.log(`could not set the look (${String(error)})`, { to: 'debug' })
      }
    }

    return next(e)
  })

  on('command.run', { command: COMMAND }, async ($, e) => {
    const word = e.args.trim().toLowerCase()

    if (word === 'on') {
      try {
        const said = await turnOn($)
        await $.store.delete(OFF_KEY)

        return { text: said }
      } catch (error) {
        return { text: `Clone Eva could not be turned on: ${String(error)}` }
      }
    }

    if (word === 'off') {
      try {
        await $.theme.clear()
        await $.store.set(OFF_KEY, 'off')

        return { text: 'Clone Eva is off. /clone-eva on brings it back.' }
      } catch (error) {
        return { text: `Clone Eva could not be turned off: ${String(error)}` }
      }
    }

    return { text: `Clone Eva is ${(await isOn($)) ? 'on' : 'off'}. Use /clone-eva on or /clone-eva off.` }
  })
}

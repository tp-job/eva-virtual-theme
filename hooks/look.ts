import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Eva Dark (VS Code), flat as the editor itself: #282c34 ground, #9da5b3 text, #4480f4 links and focus.
export const { theme, problems } = makeColors({
  label: 'Clone Eva',
  only: 'dark',
  roles: {
    accent: '#4480f4', // focusBorder, links; keywords
    danger: '#f02b77', // this / self; names
    success: '#98c379', // strings
    warning: '#ff9070', // numbers; variables
    pro: '#a78cfa', // keyword violet; literals
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#21252b',
        'surface-1': '#22262d',
        'surface-2': '#23272e',
        'surface-3': '#282c34',
        'text-primary': '#dfe3ea',
        'text-secondary': '#b0b7c3',
        'text-muted': '#9da5b3',
      },
    },
    git: { added: '#98c379', removed: '#f02b77', modified: '#6495ee', merged: '#a78cfa' },
  },
})

export const LOOK: ThemeSetArgs = {
  colors: theme,
  overrideColorScheme: 'dark',
  // A still, flat ground: the Eva editor background, nothing drawn on it.
  backdrop: { color: '#21252b' },
}

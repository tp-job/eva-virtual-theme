# eva-virtual-theme

A flat dark look for Claude Code, modelled on the [Eva Dark](https://github.com/fisheva/Eva-Theme) VS Code theme.
The background, panels, text and highlights follow Eva Dark's editor colors, so the chat reads like the editor.

![eva-virtual-theme in the Claude desktop app](docs/screenshot.png)

## Requirements

- The Claude desktop or mobile app. The terminal and editor extensions draw no theme, so nothing shows there.
- Always dark: the look sets the dark color scheme whatever the system mode is.

## Install

At the prompt of a terminal session:

```
/plugin install eva-virtual-theme --marketplace tp-job/eva-virtual-theme
```

Answer `y` to add the marketplace, then pick a scope. The look turns on by itself in each new session.

## Commands

| Command | Does |
| --- | --- |
| `/clone-eva on` | Turns the look on (the default) |
| `/clone-eva off` | Turns it off, and keeps it off in later sessions |
| `/clone-eva` | Says whether it is on or off |

There is one theme per session. Another theme mod, or `/custom-theme`, replaces this one when it is set later, and
`/clone-eva off` clears whichever theme stands. Run `/custom-theme off` first, then `/clone-eva on`.

## Colors

| Role | Color | From Eva Dark |
| --- | --- | --- |
| Background, sidebar | `#21252b` | `sideBar.background` |
| Cards, panels | `#22262d`, `#23272e` | a step from the background, so the chat box blends in |
| Menus | `#282c34` | `editor.background` |
| Text | `#dfe3ea`, `#b0b7c3`, `#9da5b3` | `editor.foreground` and softer tones |
| Accent, links, focus | `#4480f4` | `focusBorder` |
| Code: keywords, literals | `#a78cfa` | keyword violet |
| Code: numbers, variables | `#ff9070` | `constant.numeric` |
| Code: names | `#f02b77` | `variable.language.this` |
| Code: strings, git added | `#98c379` | green |
| Git modified | `#6495ee` | function blue |

The backdrop is the flat color `#21252b`: no image and no logo.

## Customize

Edit `hooks/look.ts`: the surfaces, text and roles are listed there with the Eva Dark values they follow.
The theme API changes colors, the backdrop, code highlighting (`codeTheme`) and border contrast (`contrast: 'more'`).
It cannot change the font or the font size, which stay the app's own.

The colors are built with `hooks/make-colors.js`, copied from Claude Code's plugin-authoring skill. Leave it as it is.

## Troubleshooting

- **Nothing changes:** run `/clone-eva on`. If the chat still looks the same, switch to another chat and back so the window redraws.
- **Another theme shows:** run `/custom-theme off`, then `/clone-eva on`.
- **Off in every session:** `/clone-eva off` is remembered. Run `/clone-eva on` to bring the look back.

## Uninstall

```
/plugin uninstall eva-virtual-theme
```

## Credits

Colors follow the [Eva Theme](https://github.com/fisheva/Eva-Theme) by fisheva. This mod is an independent recreation of its dark palette and is not affiliated with it.

## License

[MIT](LICENSE)

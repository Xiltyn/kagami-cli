#!/usr/bin/env node
// tslint:disable: no-console
import { cyan, red } from 'chalk'

import { base64Cmd, prompt } from './commands'

const choices = {
  Base64: base64Cmd
}

const options = Object.keys(choices)

const main = async () => {
  const chosen = await prompt(options)
  const option = chosen.option

  choices[option].run()
}

main()
  .then(() => console.log(cyan('Yay!!!!')))
  .catch((err) => console.error(red('ERROR!!!!'), err))

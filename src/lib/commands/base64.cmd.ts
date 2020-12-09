import { green, red } from 'chalk'
import * as fs from 'fs'
import Inquirer from 'inquirer'
import InquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt'
import Ora from 'ora'
import OS from 'os'

import { ImageFile } from '../models'

const isFileValid = (file: string): boolean => {
  if (!file) return false

  const fileTypes = Object.keys(ImageFile.FileTypes)

  for (const type of fileTypes) {
    if (file.includes(type.toLowerCase())) return true
  }

  return false
}

const encode = async (file: string) => {
  const spinner = Ora('Generating your Base64 data right now!').start()
  try {
    const imageFile = fs.readFileSync(file)
    const base64Data = await imageFile.toString('base64')
    const mime = `image/${file.split('.')[1]}`
    const targetFile = `${process.cwd()}/base64.output.json`
    await fs.writeFileSync(targetFile, JSON.stringify({ filePath: file, mime, base64: base64Data }))

    await console.log(green(`Your image data is ready and saved to ./_outputs/base64.output.json`))
    spinner.stop()
    spinner.clear()
  } catch (err) {
    await console.log(red(`Encoding failed due to an error {{ ${err} }}`))
  }
}

export const base64Cmd = {
  run: async () => {
    try {
      Inquirer.registerPrompt('file-tree-selection', InquirerFileTreeSelection)
      const answers = await Inquirer.prompt([
        {
          type: 'file-tree-selection',
          name: 'file',
          root: `${OS.homedir()}/Documents/`,
          message: `Ok! Let's find the file you wanna encode into Base64 form.`,
          validate: (value: any) => {
            if (!isFileValid(value)) {
              return red(
                `Oops. The file you are trying to upload isn't supported. Choose on of the following filetypes instead: *.PNG, *.JPEG, *.JPG, *.GIF`
              )
            }

            return true
          }
        }
      ])

      return encode(answers.file)
    } catch (err) {
      console.log(red(`Base64 cmd failed with error {{ ${err} }}`))
    }
  }
}

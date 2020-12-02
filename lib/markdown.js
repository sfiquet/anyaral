import fs from 'fs'
import {join} from 'path'
import marked from 'marked'

export default function getHtmlFromMarkdownFile(mdFile){
  let path = join(process.cwd(), 'text', mdFile)
  let content = fs.readFileSync(path, {encoding: 'utf8'})
  return marked(content)
}

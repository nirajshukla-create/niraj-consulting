// Lists every placeholder still in the site's content: information nobody has supplied yet.
// A placeholder is a bracket with a capitalised key and a colon, e.g. [ZACH: years].
//
//   pnpm placeholders           list them
//   pnpm placeholders --check   same, but exit 1 if any remain (use before going live)

import { readFileSync, readdirSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(fileURLToPath(import.meta.url), "..", "..")
const PLACEHOLDER = /\[[A-Z][A-Z0-9 ]*:[^\]]+\]/g
const DIRS = ["lib", "app", "components"]

/** A line that only talks about placeholders (a comment) is not one. */
const isComment = (line) => /^\s*(\*|\/\/|\/\*)/.test(line)

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : /\.(ts|tsx)$/.test(name) ? [path] : []
  })
}

const found = []
for (const dir of DIRS) {
  for (const file of walk(join(root, dir))) {
    readFileSync(file, "utf8").split(/\r?\n/).forEach((line, index) => {
      if (isComment(line)) return
      for (const match of line.match(PLACEHOLDER) ?? []) {
        found.push({ placeholder: match, where: `${relative(root, file).replace(/\\/g, "/")}:${index + 1}` })
      }
    })
  }
}

if (found.length === 0) {
  console.log("No placeholders remain.")
  process.exit(0)
}

const unique = new Map()
for (const item of found) unique.set(item.placeholder, [...(unique.get(item.placeholder) ?? []), item.where])
console.log(`${unique.size} placeholder(s) still need real information:\n`)
for (const [placeholder, places] of unique) console.log(`  ${placeholder.padEnd(40)} ${places.join(", ")}`)
console.log("")
process.exit(process.argv.includes("--check") ? 1 : 0)

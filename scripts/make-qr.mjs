// Generates the station QR codes. Scanning one with any phone camera opens
//   <site-url>/access?code=SCANSHIP-MODULE-<n>
// The site validates the code, asks the user to log in / sign up if needed, then opens Module <n>.
//
// Usage: npm run qr -- <site-url> [module-number | all | SCANSHIP-<ID>] [out-dir]
//   npm run qr -- https://scanship.vercel.app            (one code for every module)
//   npm run qr -- https://scanship.vercel.app 1          (Module 1 / Station 1 only)
//   npm run qr -- https://scanship.vercel.app all ./stations
//   npm run qr -- https://scanship.vercel.app SCANSHIP-ACCESS   (general code, opens no specific module)
import QRCode from 'qrcode'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { MODULE_IDS } from '../src/modules.js'

const [siteUrl, which = 'all', outDir = 'qr-codes'] = process.argv.slice(2)

const fail = (message) => {
  console.error(message)
  console.error('Usage: npm run qr -- <site-url> [module-number | all | SCANSHIP-<ID>] [out-dir]')
  process.exit(1)
}

if (!siteUrl) fail('Missing <site-url>.')

let base
try {
  base = new URL(siteUrl)
} catch {
  fail(`"${siteUrl}" is not a valid URL. Include https://, e.g. https://scanship.vercel.app`)
}

// Work out which codes to make: [{ code, name }]
let targets
if (which === 'all') {
  targets = MODULE_IDS.map((n) => ({ code: `SCANSHIP-MODULE-${n}`, name: `module-${n}-qr` }))
} else if (/^\d+$/.test(which)) {
  targets = [{ code: `SCANSHIP-MODULE-${which}`, name: `module-${which}-qr` }]
} else if (/^SCANSHIP-[A-Z0-9_-]+$/i.test(which) && !/^SCANSHIP-MODULE-/i.test(which)) {
  targets = [{ code: which, name: `${which.toLowerCase()}-qr` }]
} else {
  fail(`"${which}" is not a module number, "all", or a SCANSHIP-<ID> code.`)
}

const options = { errorCorrectionLevel: 'H', margin: 4, color: { dark: '#040f1e', light: '#ffffff' } }
mkdirSync(outDir, { recursive: true })

for (const { code, name } of targets) {
  const link = new URL('/access', base)
  link.searchParams.set('code', code)
  await QRCode.toFile(join(outDir, `${name}.png`), link.href, { ...options, width: 1000 })
  writeFileSync(join(outDir, `${name}.svg`), await QRCode.toString(link.href, { ...options, type: 'svg' }))
  console.log(`${name}: ${link.href}`)
}
console.log(`Saved to: ${outDir}`)

// Generates the website QR code: scanning it with any phone camera opens
//   <site-url>/access?code=<code>
// and the site validates the code and continues to Log In / Sign Up.
//
// Usage: npm run qr -- <site-url> [code] [out-dir]
//   npm run qr -- https://scanship.example.com
//   npm run qr -- http://192.168.18.144:5173 SCANSHIP-ACCESS ./qr-codes
import QRCode from 'qrcode'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [siteUrl, code = 'SCANSHIP-ACCESS', outDir = 'qr-codes'] = process.argv.slice(2)

if (!siteUrl) {
  console.error('Usage: npm run qr -- <site-url> [code] [out-dir]')
  process.exit(1)
}
if (!/^SCANSHIP-[A-Z0-9_-]+$/i.test(code)) {
  console.error('The code must look like SCANSHIP-<ID>, e.g. SCANSHIP-ACCESS')
  process.exit(1)
}

const link = new URL('/access', siteUrl)
link.searchParams.set('code', code)

const options = { errorCorrectionLevel: 'H', margin: 4, color: { dark: '#040f1e', light: '#ffffff' } }
mkdirSync(outDir, { recursive: true })
await QRCode.toFile(join(outDir, 'scanship-website-qr.png'), link.href, { ...options, width: 1000 })
writeFileSync(join(outDir, 'scanship-website-qr.svg'), await QRCode.toString(link.href, { ...options, type: 'svg' }))

console.log(`QR code points to: ${link.href}`)
console.log(`Saved to: ${outDir}`)

require(`dotenv`).config()
const puppeteer = require(`puppeteer`)
const { outputJson } = require(`fs-extra`)
const login = require(`./login`)
const entries = require(`./entries.json`)

!async function go(){
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()

	// Login
	await login(page)

	const links = []
	for (let i = entries.length; i--;) {
		await page.goto(entries[i])
		const link = await page.evaluate(() => {
			const links = document.querySelectorAll(`.entry-wrap a`)
			for (let i = 0; i < links.length; i++) {
				const link = links[i].href
				if (link && link.indexOf(`download.harmontown.com`) > -1) {
					return link
				}
			}
		})
		if (!link) {
			console.log(`Couldn't find video link on page: ${entries[i]}`)
			process.exit(1)
		}
		console.log(`Found video link: ${link}`)
		links.push(link)
	}

	console.log(links)
	await outputJson(`./video-links.json`, links)


	await browser.close()
}()
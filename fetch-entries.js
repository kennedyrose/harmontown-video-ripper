const puppeteer = require(`puppeteer`)
const { outputJson } = require(`fs-extra`)
const login = require(`./login`)

const urls = []
urls.length = 101
for(let i = urls.length; i--;){
	urls[i] = `https://www.harmontown.com/category/podcasts/page/${i + 1}/`
}

async function go(){
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()

	// Login
	await login(page)

	// Get entry links
	const links = []
	for (let i = urls.length; i--;) {
		await page.goto(urls[i])
		const foundLinks = await page.evaluate(() => {
			const els = document.querySelectorAll(`a`)
			const links = []
			for (let i = els.length; i--;) {
				const link = els[i].href
				if (link && link.indexOf(`video-episode`) > -1) {
					links.push(link)
				}
			}
			return links
		})
		for(let i = foundLinks.length; i--;){
			const link = foundLinks[i]
			if (links.indexOf(link) === -1) {
				links.push(link)
			}
		}
	}

	console.log(links)
	await outputJson(`entries.json`, links)

	await browser.close()
}

go()
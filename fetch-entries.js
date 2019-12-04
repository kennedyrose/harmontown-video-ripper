require(`dotenv`).config()
const puppeteer = require('puppeteer')

const urls = []
urls.length = 101
for(let i = urls.length; i--;){
	urls[i] = `https://www.harmontown.com/category/podcasts/page/${i + 1}/`
}

async function login(){
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()
	await page.goto(`https://www.harmontown.com/wp-login.php`)
	await page.focus(`#user_login`)
	await page.keyboard.type(process.env.USERNAME)
	await page.focus(`#user_pass`)
	await page.keyboard.type(process.env.PASSWORD)
	await page.keyboard.press('Enter')

	// await browser.close()
}

login()
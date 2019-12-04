require(`dotenv`).config()

function wait(n){
	return new Promise((resolve) => {
		setTimeout(resolve, n)
	})
}

module.exports = async function login(page) {
	await page.goto(`https://www.harmontown.com/wp-login.php`)
	await page.focus(`#user_login`)
	await page.keyboard.type(process.env.USERNAME, {timeout: 1000})
	await wait(1000)
	await page.focus(`#user_pass`)
	await page.keyboard.type(process.env.PASSWORD)
	await wait(1000)
	await page.keyboard.press('Enter')
	await wait(5000)
}
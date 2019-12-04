const dl = require(`download-file-with-progressbar`)
const { existsSync, mkdirSync, outputFile, readFile } = require(`fs-extra`)
const links = require(`./video-links.json`)

function asyncDl(url){
	let prog = 0
	return new Promise((resolve, reject) => {
		dl(url, {
			// filename: 'the filename to store, default = path.basename(YOUR_URL) || "unknowfilename"',
			dir: './videos',
			onDone: (info) => {
				console.log('done', info)
				resolve(info)
			},
			onError: (err) => {
				console.error(err)
				reject(err)
			},
			onProgress: (curr, total) => {
				const perc = Math.floor(curr / total * 100)
				if(perc != prog){
					console.log(perc + `%`)
				}
				prog = perc
				// console.log('progress', perc + '%')
			},
		})
	})
}

!async function go(){
	if (!existsSync(`./videos`)) {
		mkdirSync(`./videos`)
	}
	let start
	try {
		start = await readFile(`./.progress`)
		start = Number(start)
	}
	catch(err){}
	for (let i = start || 0; i < links.length; i++) {
		await outputFile(`./.progress`, `${i}`)
		const link = links[i]
		console.log(`Downloading: ${link}`)
		await asyncDl(link)
	}
}()
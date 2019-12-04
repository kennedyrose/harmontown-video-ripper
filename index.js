const dl = require(`download-file-with-progressbar`)
const links = require(`./video-links.json`)

function asyncDl(url){
	let prog = 0
	return new Promise((resolve, reject) => {
		dl(url, {
			// filename: 'the filename to store, default = path.basename(YOUR_URL) || "unknowfilename"',
			// dir: 'the folder to store, default = os.tmpdir()',
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
	for(let i = links.length; i--;){
		const link = links[i]
		console.log(`Downloading: ${link}`)
		await asyncDl(link)
	}
}()
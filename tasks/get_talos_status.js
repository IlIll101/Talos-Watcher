const fetch = require("node-fetch");
const fs = require('fs');
module.exports = {
	data: {"name": "get_talos_status", "interval": 30000},
	
	async execute(client) {

		function get_average(array) {
			let total = 0;
			for (let i = 0; i < array.length; i++) {
				total += array[i]
			}
			return (total/array.length)
		}

		function get_response_quality(array) {
			let total = 0;
			for (let i = 0; i < array.length; i++) {
				if(array[i] === 200) {
					total += 1
				}
			}
			return (total/array.length)
		}

		function container_function() {
			setInterval(async function fetch_data() {
				let response_type = []
				let response_time = []

				for (let i = 0; i < 10; i++) {
				  let start_time = new Date().getTime();
				  const info = await fetch('https://talos.stuy.edu');
				  response_time.push(new Date().getTime() - start_time)
				  response_type.push(info.status)
				}
				
				let average_response_time = get_average(response_time);
				let response_quality = get_response_quality(response_type);
				
				client.user.setActivity('Talos | ' + Math.round(average_response_time).toString() + 'ms | ' + Math.round(100*response_quality).toString() + '%', { type: 'WATCHING' });

				let save_data = {
					"url": "https://talos.stuy.edu/",
					"average_ping": average_response_time,
					"response_quality": response_quality,
					"response_types": response_type,
					"response_times": response_time,
					"time_of_check": Date.now()
				};

				try {
					const data = JSON.stringify(save_data, null, 4);
					fs.writeFileSync('./Information/talos_responses.json', data, 'utf8');
					console.log('Saved File!')
				} 

				catch (err) {
					console.log(`Error writing file: ${err}`);
				}
				
			  }
			, 30000)
	
		}
		container_function()
	}


};
document.addEventListener("DOMContentLoaded", (event) => {
	let monster_container = document.querySelector("#monster-container")
	let new_monster_container = document.querySelector("#create-monster")
	let back_button = document.querySelector("#back")
	let forward_button = document.querySelector("#forward")

	let page_num = parseInt(1, 10)

	fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page_num}`)
		.then(response => response.json())
		.then((response_object) => {
			response_object.forEach((monster)=>{
				read_monster_list(monster)
			})
		})

	function create_new_monster_form() {
	let monster_form = document.createElement("form")
	let name_input = document.createElement("input")
	let age_input = document.createElement("input")
	let desc_input = document.createElement("input")
	let submit_button = document.createElement("button")

	name_input.id = "name"
	name_input.placeholder = "name..."

	age_input.id = "age"
	age_input.placeholder = "age..."

	desc_input.id = "description"
	desc_input.placeholder = "description..."

	submit_button.innerText = "Create"

	monster_form.append(name_input)
	monster_form.append(age_input)
	monster_form.append(desc_input)
	monster_form.append(submit_button)

	new_monster_container.append(monster_form)
	}

	create_new_monster_form()

	function read_monster_list(monster){
		let monster_ul = document.createElement("ul")
		let monster_li = document.createElement("li")

		let monster_name = document.createElement("h1")
		let monster_age = document.createElement("h2")
		let monster_description = document.createElement("p")

		monster_name.innerText = `${monster.id}) ${monster.name}`
		monster_age.innerText = `${monster.age}`
		monster_description.innerText = `${monster.description}`

		monster_li.append(monster_name)
		monster_li.append(monster_age)
		monster_li.append(monster_description)

		monster_ul.style.listStyleType = "none"

		monster_ul.append(monster_li)

		monster_container.append(monster_ul)
	}

	new_monster_container.addEventListener("submit", (event) => {
		event.preventDefault()
		fetch("http://localhost:3000/monsters/", {
			method: "POST",
			body: JSON.stringify({
				name: event.target.name.value,
				age: event.target.age.value,
				description: event.target.description.value
			}),
			headers: {
				'Content-Type' : 'application/json'
			}
		})
		.then(response => response.json())
		.then(response_object => {
			read_monster_list(response_object)
		})
	})

	back_button.addEventListener("click", (event) => {

		event.preventDefault()

		if (page_num < 2) {
			fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
			.then(response => response.json())
			.then((response_object) => {
				response_object.forEach((monster)=>{
					read_monster_list(monster)
				})
			})
		} else {
			fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page_num -= 1}`)
			.then(response => response.json())
			.then((response_object) => {
				response_object.forEach((monster)=>{
					read_monster_list(monster)
				})
			})
		}

		monster_container.innerHTML = ""

	})

	forward_button.addEventListener("click", (event) => {

		event.preventDefault()

		if (monster_container.childElementCount < 50) {
			fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page_num}`)
			.then(response => response.json())
			.then((response_object) => {
				response_object.forEach((monster)=>{
					read_monster_list(monster)
				})
			})
		} else {
			fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page_num += 1}`)
			.then(response => response.json())
			.then((response_object) => {
				response_object.forEach((monster)=>{
					read_monster_list(monster)
				})
			})
		}

		monster_container.innerHTML = ""

	})

})

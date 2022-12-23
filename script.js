const root = document.querySelector(':root')
const toggle = document.querySelector('.darkmode-toggle')
const toggleBtn = document.querySelector('.toggle')
const input = document.querySelector('.input > input')
const cards = document.querySelector('.cards-section')
const colors = document.querySelector('.colors')
const selectColors = document.querySelector('.colors-select')
const filterBtn = document.querySelectorAll('.filter-btn > div')

let isDarkMode = false
let selectedColor = "tomato-label"
let condition = "All"

selectColors.classList.add("hide")

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode = true
    switchColors()
}

filterBtn.forEach(element => {
    element.addEventListener("click", filterBtnHandler)
})

function addGlobalEventListener (type, selector, callback) {
    document.addEventListener(type, event => {
        if(event.target.matches(selector)) {
            callback(event)
        }
    })
}


toggle.addEventListener("click", toggleHandler)
addGlobalEventListener("click", ".select", colorPicker)
addGlobalEventListener("click", ".add-btn", addHandler)
addGlobalEventListener("click", ".remove-btn", removeHandler)
addGlobalEventListener("click", ".status", statusHandler)
addGlobalEventListener("click", ".colors", colorHandler)

function toggleHandler() {
    isDarkMode = !isDarkMode
    switchColors()
    isDarkMode ? toggleBtn.classList.remove("toggle-switch") : toggleBtn.classList.add("toggle-switch")
}

function switchColors () {
    if (isDarkMode) {
        root.style.setProperty("--primary-color", "#313131")
        root.style.setProperty("--secondary-color", "#999")
    } else {
        root.style.setProperty("--primary-color", "#999")
        root.style.setProperty("--secondary-color", "#313131")
    }
}

function statusHandler (event) {
    if (event.target.textContent == "finished") {
        event.target.textContent = "to do"
        event.target.style.backgroundColor = "darkolivegreen"
    } else if (event.target.textContent == "to do") {
        event.target.textContent = "pending"
        event.target.style.backgroundColor = "goldenrod"
    } else {
        event.target.textContent = "finished"
        event.target.style.backgroundColor = "tomato"
    }
    filterHandler()
}

function removeHandler (event) {
    event.target.parentElement.parentElement.remove();
}

function colorPicker (event) {
    console.log(`${event.target.classList[1]}-label`);
    selectedColor = `${event.target.classList[1]}-label`
    colors.style.backgroundColor = event.target.classList[1]
    selectColors.classList.add("hide")
}

function addHandler () {
    if (input.value && input.value != " ") {const card = document.createElement("div")
    card.classList.add("card")
    card.classList.add(selectedColor)
    card.innerHTML = `
    <p class="task">
    ${input.value}
    </p>
    <div class="options">
    <div class="status">to do</div>
    <button class="remove-btn">remove</button>
    </div>
    `
    cards.appendChild(card)
    input.value = ""}
    input.focus()
    filterHandler()
}

function colorHandler () {
    selectColors.classList.remove("hide")
}

function filterBtnHandler (event) {
    filterBtn.forEach(element => {
        element.parentElement.classList.remove("selected")
        event.target.parentElement.classList.add("selected")
    })

    condition = event.target.classList[0] 
    
    if (condition == "todo") {
        condition = "to do"
    } else if (condition != "pending" && condition != "finished" && condition != "All") {
        condition += "-label"
    }

    filterHandler()
}

function filterHandler () {
    const card = Array.prototype.slice.call(document.querySelectorAll(".card"))
    card.forEach(element => {    
        if (condition != "All") {
            if (element.children[1].children[0].textContent == condition || element.classList[1] == condition) {
                element.classList.remove("hide")
            } else {
                element.classList.add("hide")
            }
        } else {
            element.classList.remove("hide")
        }
    });
}
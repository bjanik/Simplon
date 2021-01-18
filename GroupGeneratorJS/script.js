const addButton = document.querySelector("#add")
const delLastButton = document.querySelector("#del")
const delAllButton = document.querySelector("#delAll")
const genGroupsButton = document.querySelector('#genGroups')
const delGroupsButton = document.querySelector('#delGroups')
const names = document.querySelector("#names")

const nameRegex = new RegExp('^[A-Za-z]+$')
const numberRegex = new RegExp('[0-9]+')

const deleteAllChildren = container => {
    while (container.firstChild) {
        container.removeChild(container.lastChild)
    }
}

addButton.addEventListener('click', () => {

    const input = document.querySelector('input')
    if (input.value.match(nameRegex)) {
        if (names.childElementCount === 0) {
            document.querySelector('#pool-heading').innerText = 'Pool'
        }
        const li = document.createElement('li')
        li.innerText = input.value
        names.appendChild(li)
        input.value = ''
    }
})

delLastButton.addEventListener('click', () => {
    if (names.lastChild) {
        names.removeChild(names.lastChild)
    }
    if (names.childElementCount === 0) {
        document.querySelector('#pool-heading').innerText = ''
    }
})

delAllButton.addEventListener('click', () => {
    if (names.lastChild) {
        deleteAllChildren(names)
    }
    document.querySelector('#pool-heading').innerText = ''
})

delGroupsButton.addEventListener('click', () => {
    const groups = document.querySelector(".groups")

    if (groups.firstChild)
        deleteAllChildren(groups)

})

genGroupsButton.addEventListener('click', () => {
    const input = document.querySelector('#nbStudents')
    const nbStudents = parseInt(input.value)
    const container = document.querySelector(".groups")

    if (!input.value.match(numberRegex) || nbStudents < 1) {
        return
    }
    if (container.firstChild)
        deleteAllChildren(container)

    const lis = names.getElementsByTagName('li')
    let listOfNames = []
    for (let i = 0; i < lis.length; i++) {
        listOfNames.push(lis[i].textContent)
    }
    
    let groupNumber = 1
    while (listOfNames.length > 0) {
        const div = document.createElement('div')
        const ul = document.createElement('ul')
        const heading = document.createElement('h3')
        for (let i = 0; i < nbStudents; i++) {
            if (listOfNames.length === 0) {
                break
            }
            const li = document.createElement('li')
            const index = Math.floor(Math.random() * listOfNames.length)
            li.innerHTML = listOfNames[index]
            ul.appendChild(li)
            listOfNames.splice(index, 1)
        }
        heading.innerText = "Group " + groupNumber
        div.appendChild(heading)
        div.appendChild(ul)
        container.appendChild(div)
        groupNumber += 1
    }
})
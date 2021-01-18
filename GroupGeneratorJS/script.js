const addButton = document.querySelector("#add")
const genGroupsButton = document.querySelector('#genGroups')

addButton.addEventListener('click', () => {
    const input = document.querySelector('input')
    const list = document.querySelector("#listOfNames")
    if (input.value.length > 0) {
        const li = document.createElement('li')
        li.innerHTML = input.value
        list.appendChild(li)
        input.value = ''
    }
})

const deleteAllGroups = container => {
    while (container.firstChild) {
        container.removeChild(container.lastChild)
    }
}

genGroupsButton.addEventListener('click', () => {
    const input = document.querySelector('#nbStudents')
    const nbStudents = parseInt(input.value)
    const container = document.querySelector(".groups")

    if (container.firstChild)
        deleteAllGroups(container)
    
    
    if (input.value === '' || nbStudents < 1) {
        return
    }

    const lis = document.querySelector("#listOfNames").getElementsByTagName('li')
    let listOfNames = []
    for (let i = 0; i < lis.length; i++) {
        listOfNames.push(lis[i].textContent)
    }
    
    while (listOfNames.length > 0) {
        const div = document.createElement('div')
        const ul = document.createElement('ul')
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
        div.appendChild(ul)
        container.appendChild(div)
    }
})
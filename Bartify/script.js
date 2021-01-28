const DATA = [
    {
        "title": "Master Of Puppets",
        "artist": "Metallica",
        "song": "media/master-of-puppets-remastered.mp3",
        "cover": "img/master-of-puppets.webp",
        "duration": "8:35",
        "year": 1986,
    },
    {
        "title": "Killing In The Name",
        "artist": "Rage Against The Machine",
        "song": "media/killing-in-the-name.mp3",
        "cover": "img/ratm.jpg",
        "duration": "5:14",
        "year": 1992,
    },
    {
        "title": "In Vino Veritas",
        "artist": "Nico",
        "song": "media/in-vino-veritas.mp3",
        "cover": "img/nico.jpg",
        "duration": "3:23",
        "year": 2020,
    },
    {
        "title": "Smells Like Teen Spirit",
        "artist": "Nirvana",
        "song": "media/smells-like-teen-spirit.mp3",
        "cover": "img/nevermind.jpg",
        "duration": "4:39",
        "year": 1991,
    },
    {
        "title": "In The End",
        "artist": "Linkin Park",
        "song": "media/in-the-end.mp3",
        "cover": "img/hybrid-theory.jpg",
        "duration": "3:39",
        "year": 2000,
    },
    {
        "title": "I Got 5 On It",
        "artist": "The Luniz",
        "song": "media/i-got-5-on-it.mp3",
        "cover": "img/operation-stackola.jpg",
        "duration": "4:17",
        "year": 1995,
    },
    {
        "title": "You Can't Bring Me Down",
        "artist": "Suicidal Tendencies",
        "song": "media/you-cant-bring-me-down.mp3",
        "cover": "img/lcr.jpg",
        "duration": "5:46",
        "year": 1990,
    },
    {
        "title": "Jammin",
        "artist": "Bob Marley & The Wailers",
        "song": "media/jammin.mp3",
        "cover": "img/exodus.jpg",
        "duration": "3:21",
        "year": 1977,
    },
    {
        "title": "The Kids Aren't Alright",
        "artist": "The Offspring",
        "song": "media/the-kids-arent-alright.mp3",
        "cover": "img/americana.jpeg",
        "duration": "3:00",
        "year": 1998,
    },
    {
        "title": "Chop Suey",
        "artist": "System Of A Down",
        "song": "media/chop-suey.mp3",
        "cover": "img/toxicity.jpg",
        "duration": "3:27",
        "year": 2001,
    },
    {
        "title": "Adagio For Strings",
        "artist": "Tiesto",
        "song": "media/adagio-for-strings.mp3",
        "cover": "img/adagio.jpg",
        "duration": "7:24",
        "year": 2004,
    }
]

const audio = document.querySelector('audio')
const previous = document.querySelector('#previous')
const start = document.querySelector('#start')
const next = document.querySelector('#next')
const random = document.querySelector('#random')
const tableBody = document.querySelector("tbody")
const click = new Event('click')

let CURRENT = null

const generateTable = () => {
    
    const tbody = document.getElementsByTagName('tbody')[0]
    
    const funcDispatcher = [
        (td, index) => {
            td.innerText = DATA[index].title
            return td
        },
        (td, index) => {
            td.innerText = DATA[index].artist
            return td
        },
        (td, index) => {
            td.innerText = DATA[index].duration
            return td
        },
        (td, index) => {
            td.innerText = DATA[index].year
            return td
        }
    ]

    for (let i = 0; i < Object.keys(DATA).length; i++) {

        const newtr = document.createElement('tr')

        newtr.addEventListener('click', () => {
            CURRENT = newtr
            audio.src = DATA[i].song
            cover = document.querySelector('#cover')
            cover.src = DATA[i].cover
            audio.play()
        })
        tbody.appendChild(newtr)

        for (let j = 0; j < Object.keys(funcDispatcher).length; j++) {

            let td = document.createElement('td')
            td = funcDispatcher[j](td, i)
            newtr.appendChild(td)
        }
    }
}

const sortTable = n => {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.querySelector("table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false
            x = rows[i].querySelectorAll("td")[n];
            y = rows[i + 1].querySelectorAll("td")[n];
            if (dir == "asc") {
                if (x.innerText.toLowerCase() > y.innerText.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerText.toLowerCase() < y.innerText.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

const getNextRow = () => {
    if (CURRENT) {
        let row = CURRENT.nextElementSibling
        if (row === null) {
            row = tableBody.querySelectorAll('tr')[1]
        }
        return row
    }
    return null
}

audio.addEventListener('ended', () => {
    const row = getNextRow()
    if (row) {
        row.dispatchEvent(click)
    }
})

start.addEventListener('click', () => {
    if (CURRENT === null) {
        let rows = Array.from(tableBody.querySelectorAll('tr'))
        rows[1].dispatchEvent(click)
    }
})

next.addEventListener('click', () => {
    const row = getNextRow()
    if (row) {
        row.dispatchEvent(click)
    }
})

previous.addEventListener('click', () => {
    let row = null
    if (CURRENT) {
        if (CURRENT == tableBody.children[1]) {
            row = tableBody.lastElementChild
        }
        else {
            row = CURRENT.previousElementSibling
        }
        row.dispatchEvent(click)
    }
})

random.addEventListener('click', () => {
    let rows = Array.from(tableBody.querySelectorAll('tr'))
    rows.shift()
    rows[Math.floor(Math.random() * rows.length)].dispatchEvent(click)
})

generateTable()

document.addEventListener('DOMContentLoaded', (event) => {

})

DATA = [
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
        "year": 1992,
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

const generateTable = () => {

    const tbody = document.getElementsByTagName('tbody')[0]

    const funcDispatcher = [
        (td, index) => {
            let audio = document.createElement('audio')
            let button = document.createElement('button')

            audio.src = DATA[index].song
            audio.setAttribute("id", "song" + (index + 1))
            button.innerHTML = "Play"
            button.classList.add('button')
            td.appendChild(audio)
            td.appendChild(button)
            return td
        },
        (td, index) => {
            td.innerHTML = DATA[index].title
            return td
        },
        (td, index) => {
            td.innerHTML = DATA[index].artist
            return td
        },
        (td, index) => {
            td.innerHTML = DATA[index].duration
            return td
        },
        (td, index) => {
            td.innerHTML = DATA[index].year
            return td
        }
    ]

    for (let i = 0; i < Object.keys(DATA).length; i++) {

        const newtr = document.createElement('tr')
        tbody.appendChild(newtr)

        for (let j = 0; j < Object.keys(funcDispatcher).length; j++) {

            let td = document.createElement('td')
            td = funcDispatcher[j](td, i)
            newtr.appendChild(td)
        }
    }
}

generateTable()

const BUTTONS = document.getElementsByClassName('button')
const SONGS = document.getElementsByTagName('audio')

let CURRENT = null

const handleStart = () => { // Simulate click on first Play button

    const startButton = document.getElementById('start')

    startButton.addEventListener('click', () => {
        const click = new Event('click')

        BUTTONS[0].dispatchEvent(click)
    })
}

const handleRandom = () => { // Simulate click on random Play Button

    const startButton = document.getElementById('random')

    startButton.addEventListener('click', () => {
        const click = new Event('click')

        BUTTONS[Math.floor(Math.random() * Object.keys(DATA).length)].dispatchEvent(click)
    })
}

const handlePlayPauseButtons = () => {

    for (let i = 0; i < BUTTONS.length; i++) {
        let button = BUTTONS[i]
        button.addEventListener('click', () => {

            let song = document.getElementById('song' + (i + 1))

            if (button.innerHTML === 'Play') {
                if (button != CURRENT && CURRENT) {
                    resetSong(CURRENT.previousElementSibling)
                }
                CURRENT = button
                cover = document.getElementById('cover')
                cover.src = DATA[i].cover
                button.innerHTML = 'Pause'
                song.play()
            }
            else if (button.innerHTML === 'Pause') {
                button.innerHTML = 'Play'
                song.pause()
            }
        })
    }
}

const resetSong = song => {
    song.currentTime = 0
    song.pause()
    song.nextElementSibling.innerHTML = "Play"
}

const handleEndOfSong = () => {

    for (let i = 0; i < SONGS.length; i++) {
        SONGS[i].addEventListener("ended", () => {
            resetSong(SONGS[i])

            const click = new Event('click')
            let index = i + 1
            if (index === SONGS.length) {
                index = 0
            }
            BUTTONS[index].dispatchEvent(click)
        })
    }
}

const sortTable = n => {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }


document.addEventListener('DOMContentLoaded', (event) => {
    handlePlayPauseButtons()
    handleStart()
    handleRandom()
    handleEndOfSong()
})
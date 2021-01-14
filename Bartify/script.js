
DATA = {
    1: {
        "title": "Master Of Puppets",
        "artist": "Metallica",
        "song": "media/master-of-puppets-remastered.mp3",
        "cover": "img/master-of-puppets.webp",
        "year": 1986,
    },
    2: {
        "title": "Killing In The Name",
        "artist": "Rage Against The Machine",
        "song": "media/killing-in-the-name.mp3",
        "cover": "img/ratm.jpg",
        "year": 1992,

    },
    3: {
        "title": "Nico",
        "artist": "In Vino Veritas",
        "song": "media/in-vino-veritas.mp3",
        "cover": "img/nico.jpg",
        "year": 2020,

    },
    4: {
        "title": "Smells Like Teen Spirit",
        "artist": "Nirvana",
        "song": "media/smells-like-teen-spirit.mp3",
        "cover": "img/nevermind.jpg",
        "year": 1991,

    },
    5: {
        "title": "In The End",
        "artist": "Linkin Park",
        "song": "media/in-the-end.mp3",
        "cover": "img/hybrid-theory.jpg",
        "year": 2000,

    },
    6: {
        "title": "I Got 5 On It",
        "artist": "The Luniz",
        "song": "media/i-got-5-on-it.mp3",
        "cover": "img/operation-stackola.jpg",
        "year": 1995,

    },
    7: {
        "title": "You Can't Bring Me Down",
        "artist": "Suicidal Tendencies",
        "song": "media/you-cant-bring-me-down.mp3",
        "cover": "img/lcr.jpg",
        "year": 1992,

    },
    8: {
        "title": "Jammin",
        "artist": "Bob Marley & The Wailers",
        "song": "media/jammin.mp3",
        "cover": "img/exodus.jpg",
        "year": 1977,

    },
    9: {
        "title": "The Kids Aren't Alright",
        "artist": "The Offspring",
        "song": "media/the-kids-arent-alright.mp3",
        "cover": "img/americana.jpeg",
        "year": 1998,
    },
    10: {
        "title": "Chop Suey",
        "artist": "System Of A Down",
        "song": "media/chop-suey.mp3",
        "cover": "img/toxicity.jpg",
        "year": 2001,
    },
    11: {
        "title": "Adagio For Strings",
        "artist": "Tiesto",
        "song": "media/adagio-for-strings.mp3",
        "cover": "img/adagio.jpg",
        "year": 2004,
    }
}

const generateTable = () => {

    const tbody = document.getElementsByTagName('tbody')[0]

    const funcDispatcher = {
        0: (td, index) => {
            let audio = document.createElement('audio')
            let button = document.createElement('button')

            audio.src = DATA[index + 1].song
            audio.setAttribute("id", "song" + (index + 1))
            button.innerHTML = "Play"
            button.classList.add('button')
            td.appendChild(audio)
            td.appendChild(button)
            return td
        },
        1: (td, index) => {
            td.innerHTML = DATA[index + 1].title
            return td
        },
        2: (td, index) => {
            td.innerHTML = DATA[index + 1].artist
            return td
        },
        3: (td, index) => {
            td.innerHTML = DATA[index + 1].year
            return td
        },
    }

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

CURRENT = null

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
                cover.src = DATA[i + 1].cover
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

handlePlayPauseButtons()
handleStart()
handleRandom()
handleEndOfSong()
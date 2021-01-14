const BUTTONS = document.getElementsByClassName('button')
const SONGS = document.getElementsByClassName('song')

COVERS = {
    1: "img/master-of-puppets.webp",
    2: "img/ratm.jpg",
    3: "img/nico.jpg",
    4: "img/nevermind.jpg",
    5: "img/hybrid-theory.jpg",
    6: "img/operation-stackola.jpg",
    7: "img/lcr.jpg",
    8: "img/exodus.jpg",
    9: "img/americana.jpeg",
    10: "img/toxicity.jpg",
}

CURRENT = null

const resetSong = song => {
    song.currentTime = 0
    song.pause()
    song.nextElementSibling.innerHTML = "Play"
}

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
            cover.src = COVERS[i + 1]
            button.innerHTML = 'Pause'
            song.play()
        }
        else if (button.innerHTML === 'Pause') {
            button.innerHTML = 'Play'
            song.pause()
        }
    })
}

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
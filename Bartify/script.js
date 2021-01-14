const BUTTONS = document.getElementsByClassName('button')

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

IS_PLAYING = false
CURRENTLY_PLAYING = null

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        let song = document.getElementById('song' + (i + 1))
        if (ISPLAYING === false && BUTTONS[i].innerHTML === 'Play') {
            ISPLAYING = true
            cover = document.getElementById('cover')
            cover.src = COVERS[i + 1]
            BUTTONS[i].innerHTML = 'Pause'
            song.play()
        }
        else if (ISPLAYING === true && BUTTONS[i].innerHTML === 'Pause') {
            ISPLAYING = false
            BUTTONS[i].innerHTML = 'Play'    
            song.pause()
        }
    })
}
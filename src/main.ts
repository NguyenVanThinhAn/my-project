import './style.css'

type World = {
  name: string
  icon: string
  active?: boolean
  flat?: boolean
}

const worlds: World[] = [
  { name: 'World 1', icon: '♥' },
  { name: 'World 2', icon: '♥', active: true },
  { name: 'World 3', icon: '♥' },
  { name: 'World 4', icon: '♥' },
  { name: 'World 5 Flat', icon: '♟', flat: true },
]

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <main class="game-screen">
    <section class="world-window" aria-label="World selection">
      <nav class="game-tabs" aria-label="Game mode">
        <button class="game-tab is-active" type="button">Singleplayer</button>
        <button class="game-tab" type="button">Multiplayer</button>
      </nav>
      <div class="window-body">
        <section class="world-panel" aria-label="Saved worlds">
          <div class="world-list" role="listbox" aria-label="Select a world">
            ${worlds.map((world, index) => `
              <button class="world-row${world.active ? ' is-selected' : ''}" type="button" role="option" aria-selected="${Boolean(world.active)}" data-world="${index}">
                <span class="world-heart${world.flat ? ' is-flat' : ''}">${world.icon}</span>
                <span class="world-name">${world.name}</span>
                ${world.active ? '<span class="delete-world" aria-label="Delete World 2">×</span>' : ''}
              </button>
            `).join('')}
          </div>
          <div class="list-scrollbar" aria-hidden="true"><span class="scroll-up">▲</span><span class="scroll-track"><i></i></span><span class="scroll-down">▼</span></div>
          <button class="create-world" type="button"><span>+</span>Create world</button>
        </section>
        <section class="play-panel">
          <button class="play-button" type="button"><span class="play-icon"></span>Play</button>
          <button class="creative-toggle" type="button" aria-pressed="false"><span class="toggle-dot"></span>Creative Mode</button>
          <button class="world-options" type="button">World options</button>
        </section>
      </div>
    </section>
  </main>
`

const tabs = document.querySelectorAll<HTMLButtonElement>('.game-tab')
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.toggle('is-active', item === tab))
  })
})

const worldList = document.querySelector<HTMLDivElement>('.world-list')!
const scrollTrack = document.querySelector<HTMLSpanElement>('.scroll-track')!
const scrollThumb = document.querySelector<HTMLElement>('.scroll-track i')!
const scrollUp = document.querySelector<HTMLSpanElement>('.scroll-up')!
const scrollDown = document.querySelector<HTMLSpanElement>('.scroll-down')!

const syncScrollbar = () => {
  const maxScroll = worldList.scrollHeight - worldList.clientHeight
  const trackSpace = scrollTrack.clientHeight - scrollThumb.offsetHeight
  const progress = maxScroll > 0 ? worldList.scrollTop / maxScroll : 0
  scrollThumb.style.transform = `translateY(${progress * trackSpace}px)`
  scrollUp.classList.toggle('is-disabled', worldList.scrollTop <= 0)
  scrollDown.classList.toggle('is-disabled', worldList.scrollTop >= maxScroll)
}

const scrollWorlds = (amount: number) => {
  worldList.scrollTo({ top: worldList.scrollTop + amount, behavior: 'smooth' })
}

scrollUp.addEventListener('click', () => scrollWorlds(-worldList.clientHeight * 0.7))
scrollDown.addEventListener('click', () => scrollWorlds(worldList.clientHeight * 0.7))
worldList.addEventListener('scroll', syncScrollbar)
worldList.addEventListener('wheel', (event) => {
  event.preventDefault()
  scrollWorlds(event.deltaY)
}, { passive: false })

let draggingScrollbar = false
scrollTrack.addEventListener('pointerdown', (event) => {
  draggingScrollbar = true
  scrollTrack.setPointerCapture(event.pointerId)
  const bounds = scrollTrack.getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (event.clientY - bounds.top - scrollThumb.offsetHeight / 2) / (bounds.height - scrollThumb.offsetHeight)))
  worldList.scrollTop = ratio * (worldList.scrollHeight - worldList.clientHeight)
})
scrollTrack.addEventListener('pointermove', (event) => {
  if (!draggingScrollbar) return
  const bounds = scrollTrack.getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (event.clientY - bounds.top - scrollThumb.offsetHeight / 2) / (bounds.height - scrollThumb.offsetHeight)))
  worldList.scrollTop = ratio * (worldList.scrollHeight - worldList.clientHeight)
})
scrollTrack.addEventListener('pointerup', () => { draggingScrollbar = false })

syncScrollbar()

const worldRows = document.querySelectorAll<HTMLButtonElement>('.world-row')
worldRows.forEach((row) => {
  row.addEventListener('click', () => {
    worldRows.forEach((item) => {
      const selected = item === row
      item.classList.toggle('is-selected', selected)
      item.setAttribute('aria-selected', String(selected))
    })
  })
})

const creativeToggle = document.querySelector<HTMLButtonElement>('.creative-toggle')!
creativeToggle.addEventListener('click', () => {
  const enabled = creativeToggle.getAttribute('aria-pressed') !== 'true'
  creativeToggle.setAttribute('aria-pressed', String(enabled))
  creativeToggle.classList.toggle('is-enabled', enabled)
})

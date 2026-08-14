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
    <section class="player-chat" aria-labelledby="player-chat-title">
      <header class="chat-heading"><div><p class="showcase-kicker">Multiplayer</p><h2 id="player-chat-title">Player chat</h2></div><span class="chat-online"><i></i>3 online</span></header>
      <div class="chat-history" role="log" aria-live="polite" aria-label="Chat history">
        <div class="chat-message"><span class="chat-avatar avatar-green">A</span><div class="chat-bubble"><strong>Alex</strong><p>World 2 is ready!</p><time>10:42</time></div></div>
        <div class="chat-message is-self"><div class="chat-bubble"><strong>You</strong><p>Joining now...</p><time>10:43</time></div><span class="chat-avatar avatar-blue">Y</span></div>
        <div class="chat-message"><span class="chat-avatar avatar-purple">M</span><div class="chat-bubble"><strong>Mina</strong><p>Anyone building near spawn?</p><time>10:43</time></div></div>
      </div>
      <form class="chat-compose"><label class="sr-only" for="chat-input">Write a message</label><input id="chat-input" class="chat-input" type="text" maxlength="120" placeholder="Write a message..." autocomplete="off"><button class="chat-send" type="submit">Send</button></form>
    </section>
    <section class="ui-showcase" aria-labelledby="ui-showcase-title">
      <header class="showcase-heading">
        <p class="showcase-kicker">Interface kit</p>
        <h2 id="ui-showcase-title">UI elements</h2>
      </header>
      <div class="showcase-grid">
        <article class="showcase-card">
          <h3>Buttons</h3>
          <div class="showcase-stack">
            <button class="showcase-play" type="button"><span class="play-icon"></span>Play</button>
            <button class="showcase-small-button" type="button">Create world</button>
            <button class="showcase-small-button is-disabled" type="button" disabled>Disabled</button>
          </div>
        </article>
        <article class="showcase-card">
          <h3>Tabs & states</h3>
          <div class="showcase-large-tabs"><button class="game-tab is-active" type="button">Singleplayer</button><button class="game-tab" type="button">Multiplayer</button></div>
          <div class="showcase-tabs"><button class="game-tab is-active" type="button">Selected</button><button class="game-tab" type="button">Default</button></div>
          <div class="showcase-stack">
            <div class="showcase-world-row"><span class="world-heart">♥</span>World 1</div>
            <div class="showcase-world-row is-selected"><span class="world-heart">♥</span>World 2<span class="delete-world">×</span></div>
          </div>
        </article>
        <article class="showcase-card">
          <h3>Network & ping</h3>
          <div class="ping-list">
            <div class="ping-row"><span class="ping-bars ping-good"><i></i><i></i><i></i><i></i></span><strong>Excellent</strong><span class="ping-value">24 ms</span></div>
            <div class="ping-row"><span class="ping-bars ping-medium"><i></i><i></i><i></i><i></i></span><strong>Good</strong><span class="ping-value">86 ms</span></div>
            <div class="ping-row"><span class="ping-bars ping-poor"><i></i><i></i><i></i><i></i></span><strong>Weak</strong><span class="ping-value">240 ms</span></div>
            <div class="ping-row is-offline"><span class="ping-bars"><i></i><i></i><i></i><i></i></span><strong>Offline</strong><span class="ping-value">—</span></div>
          </div>
        </article>
        <article class="showcase-card">
          <h3>Controls</h3>
          <div class="showcase-stack">
            <button class="creative-toggle" type="button"><span class="toggle-dot"></span>Creative Mode</button>
            <button class="world-options" type="button">World options</button>
          </div>
        </article>
        <article class="showcase-card scrollbar-card">
          <h3>Scrollbars</h3>
          <div class="scrollbar-examples">
            <div class="demo-scrollbar vertical-scrollbar"><span>▲</span><i></i><span>▼</span></div>
            <div class="demo-scrollbar horizontal-scrollbar"><span>◀</span><i></i><span>▶</span></div>
          </div>
          <p class="scrollbar-caption">Vertical / horizontal</p>
        </article>
        <article class="showcase-card">
          <h3>Form fields</h3>
          <div class="showcase-stack">
            <label class="showcase-field"><span>World name</span><input value="World 2" aria-label="World name" /></label>
            <label class="showcase-field is-focused"><span>Seed</span><input value="847291" aria-label="Seed" /></label>
            <label class="showcase-field is-disabled"><span>Locked option</span><input value="Unavailable" disabled aria-label="Locked option" /></label>
          </div>
        </article>
        <article class="showcase-card">
          <h3>Selection states</h3>
          <div class="selection-grid">
            <label class="choice-row"><span class="radio-dot is-selected"></span>Singleplayer</label>
            <label class="choice-row"><span class="radio-dot"></span>Multiplayer</label>
            <label class="choice-row"><span class="check-box is-checked">✓</span>Allow cheats</label>
            <label class="choice-row is-muted"><span class="check-box"></span>Bonus chest</label>
          </div>
        </article>
        <article class="showcase-card">
          <h3>Badges & icons</h3>
          <div class="badge-row"><span class="showcase-badge badge-success">Ready</span><span class="showcase-badge badge-warning">Beta</span><span class="showcase-badge badge-muted">Offline</span></div>
          <div class="icon-row"><button class="showcase-icon-button" type="button" aria-label="Add">+</button><button class="showcase-icon-button" type="button" aria-label="Delete">×</button><button class="showcase-icon-button" type="button" aria-label="Settings">⚙</button></div>
        </article>
        <article class="showcase-card">
          <h3>Panels & messages</h3>
          <div class="showcase-message"><strong>World saved</strong><span>Your changes are ready to play.</span></div>
          <div class="showcase-message message-warning"><strong>Unsaved changes</strong><span>Review before leaving this screen.</span></div>
          <div class="showcase-message message-thinking"><strong>Generating world<span class="message-ellipsis" aria-label="In progress"><i>.</i><i>.</i><i>.</i></span></strong><span>Preparing terrain and resources</span></div>
          <div class="showcase-message message-dots"><span>Waiting for players<span class="message-ellipsis" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span></span></div>
          <div class="showcase-tooltip">Hover tooltip <span>?</span></div>
        </article>
        <article class="showcase-card">
          <h3>Action states</h3>
          <div class="action-state-row"><button class="showcase-small-button is-hovered" type="button">Hover</button><button class="showcase-small-button is-pressed" type="button">Pressed</button></div>
          <button class="showcase-small-button is-loading" type="button"><span class="loading-dot"></span>Loading</button>
          <button class="showcase-small-button is-danger" type="button">Delete world</button>
        </article>
        <article class="showcase-card">
          <h3>Sizes & spacing</h3>
          <div class="size-samples"><span class="size-label">S</span><button class="showcase-small-button size-small" type="button">Compact</button><span class="size-label">M</span><button class="showcase-small-button size-medium" type="button">Default</button><span class="size-label">L</span><button class="showcase-small-button size-large" type="button">Large</button></div>
        </article>
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

const chatForm = document.querySelector<HTMLFormElement>('.chat-compose')!
const chatInput = document.querySelector<HTMLInputElement>('#chat-input')!
const chatHistory = document.querySelector<HTMLDivElement>('.chat-history')!
chatForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const message = chatInput.value.trim()
  if (!message) return

  const messageElement = document.createElement('div')
  messageElement.className = 'chat-message is-self'
  messageElement.innerHTML = '<div class="chat-bubble"><strong>You</strong><p></p><time>now</time></div><span class="chat-avatar avatar-blue">Y</span>'
  messageElement.querySelector('p')!.textContent = message
  chatHistory.append(messageElement)
  chatInput.value = ''
  chatHistory.scrollTop = chatHistory.scrollHeight
})

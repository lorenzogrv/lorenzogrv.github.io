/**
 * Simplest navigation possible, please KISS
 */
const body = document.querySelector('body')
const getLinks = () => document.querySelectorAll('header nav a')

const getMain = () => document.querySelector('main')
const getTargetId = ($a) => $a.href.toString().split('#').pop()
const getSectionById = (id) => document.getElementById(id)

const setSelected = (id) => {
  body.classList.remove(...[...getLinks()].map(getTargetId))
  body.classList.add(id)

  getLinks().forEach($a => $a.classList.remove('selected'))
  document.querySelector(`a[href="#${id}"]`).classList.add('selected')
  window.history.pushState(null, '', id === 'home' ? '/' : `/${id}`)
}

const detectSelected = () => {
  const index = Math.round(getMain().scrollLeft / window.innerWidth)
  setSelected(getTargetId(getLinks()[index]))
}

const debounce = (ms, fn) => {
  let to = null
  const clear = () => { clearTimeout(to); to = null }
  return (...args) => {
    to && clear()
    to = setTimeout(() => { fn(...args); clear() }, ms)
  }
}

detectSelected()

getMain().addEventListener('scroll', debounce(20, detectSelected))

getLinks().forEach($a => {
  $a.addEventListener('click', (event) => {
    event.preventDefault()
    getSectionById(getTargetId($a)).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    })
  })
})

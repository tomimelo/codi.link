import create from 'zustand/vanilla'

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value))

const appInitialState = getLocalStorage('appInitialState') || {
  fontSize: 18,
  lineNumbers: 'off',
  minimap: false,
  theme: 'vs-dark',
  wordWrap: 'on',
  fontLigatures: 'on',
  fontFamily: "'Cascadia Code PL', 'Menlo', 'Monaco', 'Courier New', 'monospace'"
}

const useStore = create((set, get) => ({
  editors: {
    html: null,
    css: null,
    js: null,
    setEditors: ({ html, css, js }) => {
      set(state => {
        const editors = { html, css, js }
        return {
          ...state,
          editors
        }
      })
    }
  },
  settings: {
    ...appInitialState,
    updateSettings: ({ key, value }) => {
      set(state => {
        setLocalStorage('appInitialState', {
          ...state.settings,
          [key]: value
        })

        const settings = {
          ...state.settings,
          [key]: value
        }

        return {
          ...state,
          settings
        }
      })
    }
  }
}))

export const {
  getState,
  setState,
  subscribe,
  destroy
} = useStore

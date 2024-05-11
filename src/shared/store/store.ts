import { create } from 'zustand'
import { User } from '../types/user'
import {
  removeFromLocalStorage,
  writeToLocalStorage,
} from '../utils/local-storage'
import { axiosClient } from '../api'

interface Store {
  user: User | null
  token: string
  login: (user: User, token: string) => void
}

export const useStore = create<Store>()(set => ({
  user: null,
  token: '',
  login: (user, token) => {
    writeToLocalStorage('token', token)
    writeToLocalStorage('user', user)

    axiosClient.defaults.headers.Authorization = `Bearer ${token}`

    set({ user, token })
  },
  logout: () => {
    removeFromLocalStorage('token')
    removeFromLocalStorage('user')

    axiosClient.defaults.headers.Authorization = ''

    set({ user: null, token: '' })
  },
}))

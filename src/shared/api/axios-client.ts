import axios from 'axios'
import { BACKEND_BASE_URL } from '~/shared/config'
import { readFromLocalStorage } from '../utils/local-storage'

export const axiosClient = axios.create({
  baseURL: BACKEND_BASE_URL,
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${readFromLocalStorage<string>('token')}`,
  },
})

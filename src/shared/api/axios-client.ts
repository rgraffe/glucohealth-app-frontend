import axios from 'axios'
import { BACKEND_BASE_URL } from '~/shared/config'

export const axiosClient = axios.create({
  baseURL: BACKEND_BASE_URL,
  responseType: 'json',
  paramsSerializer: params => {
    const kebabCaseParams = convertKeysToKebabCase(params)
    return Object.entries(kebabCaseParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  },
})

const convertKeysToKebabCase = (
  obj: Record<string, any>,
): Record<string, any> => {
  const kebabCaseObj: Record<string, any> = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const kebabCaseKey = key
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase()
      kebabCaseObj[kebabCaseKey] = obj[key]
    }
  }
  return kebabCaseObj
}

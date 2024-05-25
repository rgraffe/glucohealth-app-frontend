import { axiosClient } from '~/shared/api'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { HttpStatusCode } from 'axios'
import { Treatment } from '~/shared/types/treatment'

const ENDPOINT_URL = '/treatment'

export async function getTreatmentById(id: string) {
  const res = await axiosClient.get<BackendResponse<Treatment>>(ENDPOINT_URL, {
    params: {
      id,
    },
    validateStatus: status => status === HttpStatusCode.Ok,
  })

  return res.data.data
}

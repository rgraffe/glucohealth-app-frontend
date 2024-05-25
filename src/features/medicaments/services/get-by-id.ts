import { axiosClient } from '~/shared/api'
import { MEDICAMENT_BACKEND_URL } from '../constants'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { HttpStatusCode } from 'axios'
import { Medicament } from '~/shared/types/medicament'

export async function getMedicamentById(id: string) {
  const res = await axiosClient.get<BackendResponse<Medicament>>(
    MEDICAMENT_BACKEND_URL,
    {
      params: {
        id,
      },
      validateStatus: status => status === HttpStatusCode.Ok,
    },
  )

  return res.data.data
}

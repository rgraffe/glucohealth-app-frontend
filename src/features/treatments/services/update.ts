import { axiosClient } from '~/shared/api'
import { UpdateTreatmentDto } from '../dto/update'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { Treatment } from '~/shared/types/treatment'

const ENDPOINT_URL = '/treatments'

export async function updateTreatment(
  id: number,
  updateTreatmentDto: UpdateTreatmentDto,
) {
  const res = await axiosClient.put<BackendResponse<Treatment>>(
    `${ENDPOINT_URL}`,
    updateTreatmentDto,
    {
      params: { id },
      validateStatus: status => status === 200,
    },
  )

  return res.data.data
}

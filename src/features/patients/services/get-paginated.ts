import { axiosClient } from '~/shared/api'
import { PATIENTS_BACKEND_URL } from '../constants'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { PaginatedItems } from '~/shared/types/dto/paginated-items'
import { Patient } from '~/shared/types/patient'
import { HttpStatusCode } from 'axios'
import { PaginationParams } from '~/shared/types/dto/pagination-params'

export async function getPaginatedPatients({
  pageIndex,
  itemsPerPage,
  nationalId,
}: PaginationParams & { nationalId: string }) {
  const params: Record<string, string | number> = { pageIndex, itemsPerPage }

  if (nationalId) {
    params.nationalId = nationalId
  }

  const res = await axiosClient.get<BackendResponse<PaginatedItems<Patient>>>(
    PATIENTS_BACKEND_URL,
    {
      params,
      validateStatus: status => status === HttpStatusCode.Ok,
    },
  )

  return res.data.data
}

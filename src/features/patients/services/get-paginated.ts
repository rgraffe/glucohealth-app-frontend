import { axiosClient } from '~/shared/api'
import { PATIENTS_BACKEND_URL } from '../constants'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { PaginatedItems } from '~/shared/types/dto/paginated-items'
import { Patient } from '~/shared/types'
import { HttpStatusCode } from 'axios'
import { PaginationParams } from '~/shared/types/dto/pagination-params'

export async function getPaginatedPatients({
  pageIndex,
  itemsPerPage,
}: PaginationParams) {
  const res = await axiosClient.get<BackendResponse<PaginatedItems<Patient>>>(
    PATIENTS_BACKEND_URL,
    {
      params: {
        pageIndex,
        itemsPerPage,
      },
      validateStatus: status => status === HttpStatusCode.Ok,
    },
  )

  return res.data.data
}

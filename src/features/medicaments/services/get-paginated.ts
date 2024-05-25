import { axiosClient } from '~/shared/api'
import { MEDICAMENTS_BACKEND_URL } from '../constants'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { PaginatedItems } from '~/shared/types/dto/paginated-items'
import { Patient } from '~/shared/types/patient'
import { HttpStatusCode } from 'axios'
import { PaginationParams } from '~/shared/types/dto/pagination-params'
import { Medicament } from '~/shared/types/medicament'

export async function getPaginatedMedicaments({
  pageIndex,
  itemsPerPage,
}: PaginationParams) {
  const res = await axiosClient.get<
    BackendResponse<PaginatedItems<Medicament>>
  >(MEDICAMENTS_BACKEND_URL, {
    params: {
      pageIndex,
      itemsPerPage,
    },
    validateStatus: status => status === HttpStatusCode.Ok,
  })

  return res.data.data
}

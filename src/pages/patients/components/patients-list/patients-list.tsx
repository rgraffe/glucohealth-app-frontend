import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  useIonLoading,
} from '@ionic/react'
import { Fragment, useRef } from 'react'
import { PatientListItem } from './patient-list-item'
import { getPaginatedPatients } from '~/features/patients/services/get-paginated'
import { useInfiniteQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '~/features/patients/constants'

const INITIAL_PAGE = 1
const ITEMS_PER_PAGE = 5

export function PatientsList() {
  const [present, dismiss] = useIonLoading()

  const isFirstFetch = useRef(true)

  const { data, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PATIENTS_LIST],
    queryFn: async ({ pageParam }) => {
      if (isFirstFetch.current) {
        present()
      }

      const patients = await getPaginatedPatients({
        pageIndex: pageParam,
        itemsPerPage: ITEMS_PER_PAGE,
      })

      if (isFirstFetch.current) {
        dismiss()
        isFirstFetch.current = false
      }

      return patients
    },
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: lastPage => lastPage.pageIndex + 1,
  })

  if (isError) {
    return <h1>Error listando los clientes.</h1>
  }

  return (
    <>
      <IonList className="overflow-y-scroll max-w-xl gap-5 w-full">
        {data?.pages?.map(p => (
          <Fragment key={p.pageIndex}>
            {p.items.map(patient => (
              <PatientListItem key={patient.id} patient={patient} />
            ))}
          </Fragment>
        ))}
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={async ev => {
          await fetchNextPage()
          ev.target.complete()
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  )
}

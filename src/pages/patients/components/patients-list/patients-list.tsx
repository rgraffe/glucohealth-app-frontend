import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
} from '@ionic/react'
import { Fragment } from 'react'
import { PatientListItem } from './patient-list-item'
import { getPaginatedPatients } from '~/features/patients/services/get-paginated'
import { useInfiniteQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '~/features/patients/constants'

const ITEMS_PER_PAGE = 5

export function PatientsList() {
  const { data, isPending, isFetching, isError, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.PATIENTS_LIST],
      queryFn: ({ pageParam }) => {
        console.log('pageParam', pageParam)
        return getPaginatedPatients({
          pageIndex: pageParam,
          itemsPerPage: ITEMS_PER_PAGE,
        })
      },
      initialPageParam: 0,
      getNextPageParam: lastPage => lastPage.pageIndex + 1,
    })

  if (isPending || isFetching) {
    return <h1>Cargando</h1>
  }

  if (isError) {
    return <h1>Error listando los clientes.</h1>
  }

  return (
    <>
      <IonList className="overflow-y-scroll max-w-xl gap-5 w-full">
        {data.pages.map(p => (
          <Fragment key={p.pageIndex}>
            {p.items.map(patient => (
              <PatientListItem key={patient.id} patient={patient} />
            ))}
          </Fragment>
        ))}
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={ev => {
          fetchNextPage()
          setTimeout(() => ev.target.complete(), 500)
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  )
}

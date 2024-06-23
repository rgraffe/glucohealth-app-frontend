import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  useIonLoading,
} from '@ionic/react'
import { Fragment, useRef, useState } from 'react'
import { PatientListItem } from './patient-list-item'
import { getPaginatedPatients } from '~/features/patients/services/get-paginated'
import { useInfiniteQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '~/features/patients/constants'

interface Props {
  nationalId: string
}

const INITIAL_PAGE = 1
const ITEMS_PER_PAGE = 5

export function PatientsList({ nationalId }: Props) {
  const [present, dismiss] = useIonLoading()

  const isFirstFetch = useRef(true)

  const { data, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PATIENTS_LIST, nationalId],
    queryFn: async ({ pageParam }) => {
      if (isFirstFetch.current) {
        present()
      }

      const patients = await getPaginatedPatients({
        pageIndex: pageParam,
        itemsPerPage: ITEMS_PER_PAGE,
        nationalId,
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
      <IonList className="max-w-xl gap-5 w-full">
        {data?.pages?.every(p => p.itemCount === 0) && (
          <h4 className="ml-4 opacity-80">No se han encontrado pacientes.</h4>
        )}

        {data?.pages?.map(p => (
          <Fragment key={p.pageIndex}>
            {p.items.map(patient => (
              <PatientListItem key={patient.id} patient={patient} />
            ))}
          </Fragment>
        ))}
        <IonInfiniteScroll
          onIonInfinite={async ev => {
            await fetchNextPage()
            ev.target.complete()
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonList>
    </>
  )
}

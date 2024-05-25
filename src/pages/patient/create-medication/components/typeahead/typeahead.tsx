import React, { useState } from 'react'
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonSearchbar,
  IonToolbar,
} from '@ionic/react'
import type { CheckboxCustomEvent } from '@ionic/react'

interface TypeaheadProps {
  items: Item[]
  selectedItem: number | null
  title?: string
  onSelectionCancel?: () => void
  onSelectionChange?: (item: number) => void
}

interface Item {
  text: string
  value: number
}

function Typeahead(props: TypeaheadProps) {
  const [filteredItems, setFilteredItems] = useState<Item[]>([...props.items])
  const [workingSelectedValue, setWorkingSelectedValue] = useState<
    number | null
  >(props.selectedItem)

  const isChecked = (value: number) => {
    return workingSelectedValue === value
  }

  const cancelChanges = () => {
    const { onSelectionCancel } = props
    if (onSelectionCancel !== undefined) {
      onSelectionCancel()
    }
  }

  const confirmChanges = () => {
    const { onSelectionChange } = props
    if (onSelectionChange !== undefined && workingSelectedValue !== null) {
      onSelectionChange(workingSelectedValue)
    }
  }

  const searchbarInput = (ev: any) => {
    filterList(ev.target.value)
  }

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  const filterList = (searchQuery: string | null | undefined) => {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined || searchQuery === null) {
      setFilteredItems([...props.items])
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase()
      setFilteredItems(
        props.items.filter(item => {
          return item.text.toLowerCase().includes(normalizedQuery)
        }),
      )
    }
  }

  const checkboxChange = (ev: CheckboxCustomEvent) => {
    const { checked, value } = ev.detail

    if (checked) {
      setWorkingSelectedValue(value)
    } else {
      setWorkingSelectedValue(null)
    }
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={cancelChanges}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={confirmChanges}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonInput={searchbarInput}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" class="ion-padding">
        <IonList id="modal-list" inset={true}>
          {filteredItems.map(item => (
            <IonItem key={item.value}>
              <IonCheckbox
                value={item.value}
                checked={isChecked(item.value)}
                onIonChange={checkboxChange}
              >
                {item.text}
              </IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  )
}
export default Typeahead

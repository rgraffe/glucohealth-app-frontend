import { IonInput, IonButton } from '@ionic/react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router'
import { PreregisterDto } from '~/features/patients'
import { ROUTES } from '~/shared/constants/routes'

export function PreregisterForm() {
  const history = useHistory()

  const { handleChange, handleSubmit } = useFormik<PreregisterDto>({
    initialValues: {
      email: '',
      nationalId: '',
    },
    onSubmit: values => {
      history.push(ROUTES.APP.PATIENTS.PATH)
    },
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
      onInput={handleChange}
      className="flex flex-col w-full justify-center items-center gap-5"
    >
      <IonInput
        name="email"
        fill="outline"
        labelPlacement="stacked"
        type="email"
        label="Correo Electrónico"
        className="max-w-xl"
        mode="md"
      />
      <IonInput
        name="password"
        fill="outline"
        labelPlacement="stacked"
        label="Número único de identificación"
        className="max-w-xl"
        mode="md"
      ></IonInput>
      <IonButton type="submit">Continuar</IonButton>
    </form>
  )
}

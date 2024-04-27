import { IonInput, IonInputPasswordToggle, IonButton } from '@ionic/react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router'
import { ROUTES } from '~/shared/constants/routes'
import { LoginDto } from '~/shared/types/dtos/login'

export function LoginForm() {
  const history = useHistory()

  const { handleChange, handleSubmit } = useFormik<LoginDto>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
      history.push(ROUTES.DASHBOARD.ROOT)
    },
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
      onInput={handleChange}
      className="flex flex-col w-full h-full justify-center items-center gap-5 px-3"
    >
      <IonInput
        name="email"
        fill="outline"
        label="Correo Electrónico"
        className="max-w-xl"
        mode="md"
      />
      <IonInput
        name="password"
        fill="outline"
        label="Contraseña"
        type="password"
        className="max-w-xl"
        mode="md"
      >
        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
      </IonInput>
      <IonButton type="submit">Iniciar Sesión</IonButton>
    </form>
  )
}

import { IonInput, IonInputPasswordToggle, IonButton } from '@ionic/react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router'
import { ROUTES } from '~/shared/constants/routes'
import { LoginDto } from '~/features/auth/dto/login'
import { loginSchema } from '~/features/auth/schemas/login'
import { useMutation } from '@tanstack/react-query'
import { loginService } from '~/features/auth/services/login'
import { useStore } from '~/shared/store/store'

export function LoginForm() {
  const history = useHistory()

  const loginAction = useStore(state => state.login)

  const loginMutation = useMutation({
    mutationFn: async (values: LoginDto) => {
      const res = await loginService(values)
      loginAction(res.user, res.token)
    },
    onSuccess: data => {
      history.push(ROUTES.APP.PATH)
    },
  })

  const { handleChange, handleSubmit, errors, touched } = useFormik<LoginDto>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      loginMutation.mutate(values)
    },
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
      onInput={handleChange}
      className="flex flex-col justify-center items-center gap-5"
    >
      <IonInput
        name="email"
        fill="outline"
        label="Correo Electrónico"
        type="email"
        errorText={errors.email}
        className={`max-w-xl ${errors.email ? 'ion-invalid' : ''} ${touched.email && 'ion-touched'}`}
        mode="md"
      />
      <IonInput
        name="password"
        fill="outline"
        label="Contraseña"
        type="password"
        errorText={errors.password}
        className={`max-w-xl ${errors.password ? 'ion-invalid' : ''} ${touched.password && 'ion-touched'}`}
        mode="md"
      >
        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
      </IonInput>
      <IonButton type="submit" color="primary">
        Iniciar Sesión
      </IonButton>
    </form>
  )
}

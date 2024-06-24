import { useForm } from 'react-hook-form'
import { getSubmit } from './api'
import { Toaster, toast } from 'sonner'

export default function LogInUser() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
    setFocus
  } = useForm()

  const onSubmit = (data) => {
    getSubmit(data)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if (json?.data?.token) {
          localStorage.setItem('token', json.data.token)
          toast.success('Login successful')
          setFocus('email')
          reset()
        } else {
          toast.warning('Login failed')
        }
      })
      .catch((error) => {
        console.error('Login Error:', error)
        toast.error('Login error: ' + error.message)
      })
  }

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Toaster position='top-right' richColors />
      <h1 className='text-3xl font-bold text-center bg-purple-600 p-4'>
        Log In 
      </h1>
      <form
        className='flex flex-col gap-5 items-center justify-center mt-[15rem]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type='email'
          className='bg-gray-700 text-white border-2 border-gray-600 rounded-lg p-2 w-[26rem]'
          placeholder='Email'
          {...register('email', {
            required: { value: true, message: 'El campo es requerido' },
            minLength: { value: 3, message: 'Minimo 3 caracteres' },
            maxLength: { value: 180, message: 'Maximo 180 caracteres' }
          })}
        />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        <input
          type='password'
          className='bg-gray-700 text-white border-2 border-gray-600 rounded-lg p-2 w-[26rem] '
          placeholder='Password'
          {...register('password', {
            required: { value: true, message: 'El campo es requerido' },
            minLength: { value: 3, message: 'Minimo 3 caracteres' },
            maxLength: { value: 180, message: 'Maximo 180 caracteres' }
          })}
        />
        {errors.password && (
          <p className='text-red-500'>{errors.password.message}</p>
        )}
        <button
          className='bg-purple-500 text-white border-2 border-purple-600 rounded-lg p-2 ml-2 disabled:bg-gray-500 disabled:border-gray-600 disabled:cursor-not-allowed'
          disabled={isSubmitted ? !isValid : false}
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
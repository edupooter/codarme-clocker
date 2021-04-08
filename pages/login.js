import { useFormik } from 'formik'

import * as yup from 'yup'

import Link from 'next/link'

import { useRouter } from 'next/router'

import { useEffect } from 'react'

import {
  Container,
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText
} from '@chakra-ui/react'

import { Logo, useAuth } from '../components'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório')
})

export default function Login () {
  const [auth, { login }] = useAuth()

  const router = useRouter()

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isLoading
  } = useFormik({
    onSubmit: login,
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ''
    }
  })

  useEffect(() => {
    auth.user && router.push('/agenda')
  }, [auth.user])

  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>
        <FormControl id='email' p={4} isRequired>
          <FormLabel>
            Endereço de e-mail
          </FormLabel>
          <Input type='email' size='lg' value={values.email} onChange={handleChange} onBlur={handleBlur} />
          {touched.email && <FormHelperText textColor='#e74c3c'>{errors.email}</FormHelperText>}
        </FormControl>

        <FormControl id='password' p={4} isRequired>
          <FormLabel>
            Senha
          </FormLabel>
          <Input type='password' size='lg' value={values.password} onChange={handleChange} onBlur={handleBlur} />
          {touched.password && <FormHelperText textColor='#e74c3c'>{errors.password}</FormHelperText>}
        </FormControl>

        <Box p={4}>
          <Button width='100%' colorScheme='blue' onClick={handleSubmit} isLoading={isSubmitting}>
            Entrar
          </Button>
        </Box>
      </Box>

      <Link href='/signup'>
        Ainda não tem uma conta? Registre-se aqui
      </Link>

    </Container>
  )
}

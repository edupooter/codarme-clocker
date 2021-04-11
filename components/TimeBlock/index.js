import { useState } from 'react'

import { Form, useFormik } from 'formik'

import * as yup from 'yup'

import axios from 'axios'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react'

import { format } from 'date-fns'

import { Input } from '../Input'

const setSchedule = async ({ date, ...data }) => axios({
  method: 'post',
  url: '/api/schedule',
  data: {
    ...data,
    date: format(date, 'yyyy-MM-dd'),
    username: window.location.pathname.replace('/', '')
  }
})

const ModalTimeBlock = ({ isOpen, onClose, onComplete, isSubmitting, children }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        Faça sua reserva
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {children}
      </ModalBody>

      <ModalFooter>
        {!isSubmitting && <Button variant='ghost' onClick={onClose}>Cancelar</Button>}
        <Button colorScheme='blue' ml={3} onClick={onComplete} isLoading={isSubmitting}>
          Reservar horário
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export const TimeBlock = ({ time, date, disabled }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(prevState => !prevState)

  const { values, handleSubmit, handleChange, handleBlur, errors, touched, isSubmitting } = useFormik({
    onSubmit: async (values) => {
      try {
        await setSchedule({ ...values, time, date })
        toggle()
      } catch (error) {
        console.error(error)
      }
    },
    initialValues: {
      name: '',
      phone: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Preenchimento obrigatório'),
      phone: yup.string().required('Preenchimento obrigatório')
    })
  })

  return (
    <Button p={8} bg='blue.500' color='white' onClick={toggle} disabled={disabled}>
      {time}

      {!disabled && <ModalTimeBlock
        isOpen={isOpen}
        onClose={toggle}
        onComplete={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <>
          <Input
            label='Nome:'
            name='name'
            touched={touched.name}
            error={errors.name}
            value={values.name}
            placeholder='Fulano'
            onChange={handleChange}
            onBlur={handleBlur}
            size='lg'
            disabled={isSubmitting}
          />

          <Input
            label='Telefone:'
            name='phone'
            touched={touched.phone}
            error={errors.phone}
            value={values.phone}
            placeholder='(99) 99999-9999'
            onChange={handleChange}
            onBlur={handleBlur}
            size='lg'
            type='tel'
            disabled={isSubmitting}
          />
        </>
      </ModalTimeBlock>}
    </Button>
  )
}

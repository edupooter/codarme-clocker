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

import { Input } from '../Input'

const setSchedule = async data => axios({
  method: 'post',
  url: '/api/schedule',
  data: {
    ...data,
    username: window.location.pathname
  }
})

const ModalTimeBlock = ({ isOpen, onClose, onComplete, children }) => (
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
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button colorScheme="blue" ml={3} onClick={onComplete}>
          Reservar horário
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export const TimeBlock = ({ time }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(prevState => !prevState)

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
    onSubmit: (values) => setSchedule(values),
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
    <Button p={8} bg='blue.500' color='white' onClick={toggle}>
      {time}

      <ModalTimeBlock isOpen={isOpen} onClose={toggle} onComplete={handleSubmit}>
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
            />
        </>
      </ModalTimeBlock>
    </Button>
  )
}

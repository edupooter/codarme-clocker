import { Box, Button, Container } from '@chakra-ui/react'

import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

import axios from 'axios'

import { useFetch } from '@refetty/react'

import { Logo, useAuth, formatDate } from '../components'

const getAgenda = ({ token, when }) => axios({
  method: 'get',
  url: '/api/agenda',
  params: {
    when
  },
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const Header = ({ children }) => (
  <Box p={4} display='flex' alignItems='center' justifyContent='space-between'>
    {children}
  </Box>
)

export default function Agenda () {
  const [auth, { logout }] = useAuth()

  const router = useRouter()

  const [when, setWhen] = useState(() => new Date())

  // const [data, {loading, status, error}, fetch] = useFetch(() => getAgenda(when))

  useEffect(() => {
    !auth.user && router.push('/')
  }, [auth.user])

  return (
    <Container>
      <Header>
        <Logo size={150} />
        <Button onClick={logout}>
          Sair
        </Button>
      </Header>
      <Box>{formatDate(new Date, 'PPPP')}</Box>
    </Container>
  )
}

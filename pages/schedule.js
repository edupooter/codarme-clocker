import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

import axios from 'axios'

import { addDays, subDays } from 'date-fns'

import { useFetch } from '@refetty/react'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

import { Box, Button, Container, IconButton, SimpleGrid, Spinner } from '@chakra-ui/react'

import { Logo, useAuth, formatDate, TimeBlock } from '../components'

const getSchedule = async (when) => axios({
  method: 'get',
  url: '/api/schedule',
  params: { when, username: window.location.pathname }
})

const Header = ({ children }) => (
  <Box p={4} display='flex' alignItems='center' justifyContent='space-between'>
    {children}
  </Box>
)

export default function Schedule () {
  const [auth, { logout }] = useAuth()

  const router = useRouter()

  const [when, setWhen] = useState(() => new Date())

  const [data, { loading, status, error }, fetch] = useFetch(getSchedule, { lazy: true })

  const addDay = () => setWhen(prevState => addDays(prevState, 1))

  const removeDay = () => setWhen(prevState => subDays(prevState, 1))

  useEffect(() => {
    fetch(when)
  }, [when])

  return (
    <Container>
      <Header>
        <Logo size={150} />
        <Button onClick={logout}>
          Sair
        </Button>
      </Header>

      <Box mt={8} display='flex' alignItems='center'>
        <IconButton icon={<ChevronLeftIcon />} bg='transparent' onClick={removeDay} />
        <Box flex={1} textAlign='center'>
          {formatDate(when, 'PPPP')}
        </Box>
        <IconButton icon={<ChevronRightIcon />} bg='transparent' onClick={addDay} />
      </Box>

      <SimpleGrid p={4} columns={2} spacing={4}>
        {loading && <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
        {data?.map(time => <TimeBlock key={time} time={time} date={when} />)}
      </SimpleGrid>

    </Container>
  )
}

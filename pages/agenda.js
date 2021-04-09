import { Button } from '@chakra-ui/react'

import { useRouter } from 'next/router'

import { useEffect } from 'react'

import axios from 'axios'

import { useFetch } from '@refetty/react'

import { useAuth } from '../components'

export default function Agenda () {
  const [auth, { logout }] = useAuth()

  const router = useRouter()

  useEffect(() => {
    !auth.user && router.push('/')
  }, [auth.user])

  return (
    <div>
      <Button onClick={logout}>
        Sair
      </Button>
    </div>
  )
}

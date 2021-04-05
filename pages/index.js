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

import { Logo } from './../components'

export default function Home () {
  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>
            Endereço de e-mail
          </FormLabel>
          <Input type="email" />
          <FormHelperText>Nunca compartilharemos seu e-mail</FormHelperText>
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>
            Senha
          </FormLabel>
          <Input type="password" />
        </FormControl>

        <Box display="flex" flexDirection="row" alignItems="center">
          <FormControl id="username" p={4} isRequired>
            <Text>
              clocker.website/
            </Text>
            <Input type="username" />
          </FormControl>
        </Box>

        <Box p={4}>
          <Button width="100%">
            Entrar
          </Button>
        </Box>
      </Box>

    </Container>
  )
}

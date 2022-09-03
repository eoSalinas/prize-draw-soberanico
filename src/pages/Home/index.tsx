import { Header } from '../../components/Header'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trophy, UserPlus } from 'phosphor-react'

import {
  AddParticipantButton,
  FormContainer,
  HomeContainer,
  NameInput,
  StartPrizeDrawButton,
} from './styles'

interface participant {
  name: string
}

export function Home() {
  // Participant List
  const [participants, setParticipants] = useState<participant[]>([])

  // Hook Form
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: '',
    },
  })

  // Variaveis Auxiliares to verification
  const name = watch('name')
  const isSubmitEmpyt = !name

  function handleAddNewParticipant(data: participant) {
    const newParticipant = {
      name: data.name,
    }

    setParticipants((state) => [...state, newParticipant])
    reset()
  }

  function handleSortTheWinner() {
    const participantsCopy = participants
    const participantsSorted = participantsCopy.sort()
    console.log(participantsSorted[0])
  }

  console.log(participants)
  return (
    <HomeContainer>
      <Header />
      <form action="" onSubmit={handleSubmit(handleAddNewParticipant)}>
        <FormContainer>
          <NameInput
            id="name"
            type="text"
            placeholder="Qual o nome do participande?"
            {...register('name')}
          />
          <AddParticipantButton type="submit" disabled={isSubmitEmpyt}>
            <UserPlus size={20} />
            Adicionar Participante
          </AddParticipantButton>
          <span>{participants.length} participantes atualmente.</span>
        </FormContainer>
      </form>

      <h1 hidden={true}>th_manso</h1>
      <StartPrizeDrawButton onClick={handleSortTheWinner}>
        <Trophy size={24} />
        Sortear Vencedor
      </StartPrizeDrawButton>
    </HomeContainer>
  )
}

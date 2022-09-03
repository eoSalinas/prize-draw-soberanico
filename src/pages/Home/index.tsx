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

  // Winner
  const [winner, setWinner] = useState<string>('')

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

  function fisherYatesShuffle(arr: participant[]) {
    for (let i: number = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)) // random index
      ;[arr[i], arr[j]] = [arr[j], arr[i]] // swap
    }
  }

  function handleSortTheWinner() {
    const participantsToShuffle = participants
    fisherYatesShuffle(participants)
    const participantWinner = participantsToShuffle[0].name

    setWinner(participantWinner)
  }

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

      <h1>{winner}</h1>
      <StartPrizeDrawButton onClick={handleSortTheWinner}>
        <Trophy size={24} />
        Sortear Vencedor
      </StartPrizeDrawButton>
      <p>Powered by Soberano dos mares</p>
    </HomeContainer>
  )
}

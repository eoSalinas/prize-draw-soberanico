import { HeaderContainer } from './styles'

import logoSDM from '../../assets/soberano-logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoSDM} alt="" />
    </HeaderContainer>
  )
}

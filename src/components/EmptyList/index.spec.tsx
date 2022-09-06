import {render} from '@testing-library/react-native'
import EmptyList from '.'

it('verifing component', () => {
  const {queryByText} = render(<EmptyList/>)

  expect(queryByText('Nenhum produto registrado.')).toBeTruthy()
})
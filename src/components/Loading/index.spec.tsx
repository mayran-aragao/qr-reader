import {render} from '@testing-library/react-native'
import Loading from '.'

it('returning the right text', () => {
  const {queryByText} = render(<Loading/>)

  expect(queryByText('Enviando...')).toBeTruthy()
})
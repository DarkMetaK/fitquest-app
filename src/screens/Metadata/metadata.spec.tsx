import {
  act,
  render,
  screen,
  userEvent,
  waitFor,
} from '@test/utils/customRender'
import { UserEventInstance } from '@testing-library/react-native/build/user-event/setup'

import {
  getUserMetadata,
  MetadataProps,
} from '@/libs/async-storage/metadata'
import { Metadata } from '@/screens/Metadata'

describe('Screen: Metadata', () => {
  let user: UserEventInstance
  let progressTrack: HTMLElement | null

  beforeEach(async () => {
    jest.useFakeTimers()
    user = userEvent.setup()

    render(<Metadata />)

    await waitFor(() => {
      expect(screen.getByTestId('progressTrack')).toBeTruthy()
    })

    progressTrack = screen.queryByTestId('progressTrack')
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  async function pressConfirmButtonAndAssertProgress(expectedWidth: string) {
    const confirmButton = screen.queryByText('Continuar')

    await act(async () => {
      await user.press(confirmButton)
    })

    await act(async () => {
      jest.advanceTimersByTime(700)
    })

    const progressTrack = screen.queryByTestId('progressTrack')
    expect(progressTrack).toHaveAnimatedStyle({ width: expectedWidth })
  }

  async function assertStoredData(
    key: keyof MetadataProps,
    expectedValue: number | string,
  ) {
    const storagedData = await getUserMetadata()
    expect(storagedData[key]).toEqual(expectedValue)
  }

  // First Step -> Age
  it('should be able to choose an age and save it on localstorage', async () => {
    expect(progressTrack).toHaveAnimatedStyle({ width: '25%' })

    await pressConfirmButtonAndAssertProgress('50%')
    await assertStoredData('age', 12)
  })

  // Second Step -> Weight
  it('should be able to choose a weight and save it on localstorage', async () => {
    await pressConfirmButtonAndAssertProgress('50%')
    await pressConfirmButtonAndAssertProgress('75%')
    await assertStoredData('weight', 42)
  })

  // Third Step -> Height
  it('should be able to choose a height and save it on localstorage', async () => {
    await pressConfirmButtonAndAssertProgress('50%')
    await pressConfirmButtonAndAssertProgress('75%')
    await pressConfirmButtonAndAssertProgress('100%')
    await assertStoredData('height', 110)
  })

  // Fourth Step -> Weekly Goal
  it('should be able to choose a weekly goal and save it on localstorage', async () => {
    await pressConfirmButtonAndAssertProgress('50%')
    await pressConfirmButtonAndAssertProgress('75%')
    await pressConfirmButtonAndAssertProgress('100%')
    await pressConfirmButtonAndAssertProgress('100%')
    await assertStoredData('goal', 4)
  })
})

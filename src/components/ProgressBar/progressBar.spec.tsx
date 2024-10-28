import { act, render, screen, userEvent } from '@test/utils/customRender'

import { ProgressBar } from '@/components/ProgressBar'

describe('Component: ProgressBar', () => {
  beforeEach(async () => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should display the right amount of steps and progress', async () => {
    render(<ProgressBar totalSteps={10} currentStep={3} />)

    // Wait for the animation to complete
    await act(async () => {
      jest.advanceTimersByTime(700)
    })

    const progressTrack = screen.queryByTestId('progressTrack')
    expect(progressTrack).toHaveAnimatedStyle({ width: '30%' })
  })

  it('should call onBackPress when the back button is displayed and pressed', async () => {
    const user = userEvent.setup()
    const onPress = jest.fn()

    render(
      <ProgressBar totalSteps={10} currentStep={3} onBackPress={onPress} />,
    )

    const backButton = screen.getByLabelText('Previous Step')

    await act(async () => {
      await user.press(backButton)
    })

    expect(onPress).toHaveBeenCalled()
  })
})

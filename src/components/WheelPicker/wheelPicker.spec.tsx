import { render, screen, userEvent } from '@test/utils/customRender'

import { WheelPicker } from '@/components/WheelPicker'

const OPTIONS = ['1', '2', '3']

describe('Component: WheelPicker', () => {
  it('should be able to change the selected option on wheel picker', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()

    render(
      <WheelPicker options={OPTIONS} selectedIndex={1} onChange={onChange} />,
    )

    const flatList = screen.queryByTestId('wheelPicker')
    await user.scrollTo(flatList, {
      y: 100,
      momentumY: 200,
    })

    expect(onChange).toHaveBeenCalledWith(2)
  })
})

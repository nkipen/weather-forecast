import { shallowMount } from '@vue/test-utils'
import Header from '@/components/FullWidget.vue'

describe('FullWidget.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Header, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

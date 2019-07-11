import {shallowMount} from '@vue/test-utils'
import Vue from 'vue'
import ElementUI from 'element-ui'

import HelloWorld from '../../src/views/myWork/index'

Vue.use(ElementUI)
describe('index.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message'
        const wrapper = shallowMount(HelloWorld, {
            propsData: {msg}
        })
        expect(wrapper.text()).toMatch(msg)
    })
})

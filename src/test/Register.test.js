import React  from 'react';
import { shallow, mount } from '../testSetup';
import Register from '../components/SignUpComponent';

describe('register component ', () => {
    it('Register details ', () => {
        expect(shallow(<Register/>).exists()).toBe(true);
    });

    it('Renders firstName input ', () => {
        expect(mount(<Register/>).find('#firstName').length).toEqual(2);
    })

    it('Renders lastName input ', () => {
        expect(mount(<Register/>).find('#lastName').length).toEqual(2);
    })

    it('Renders email input ', () => {
        expect(mount(<Register/>).find('#email').length).toEqual(2);
    })

    it('Renders selectedOption input ', () => {
        expect(mount(<Register/>).find('#selectedOption').length).toEqual(2);
    })

    it('Renders password input ', () => {
        expect(mount(<Register/>).find('#password').length).toEqual(2);
    })
});

describe('firstName input ', () =>{
    it('respond to the change event and change the state of the firstName', () =>{
        const wrapper = shallow(<Register/>);
        wrapper.find('#firstName').simulate('change', {
            target: {
                name: 'firstName',
                value: 'Aarti'
            }
        })
        expect(wrapper.state('firstName')).toEqual('Aarti');
    })
})

describe('lastName input', () => {
    it('respond to the change event and change the state of the firstName', () => {
        const wrapper = shallow(<Register/>);
        wrapper.find('#lastName').simulate('change', {
            target: {
                name: 'lastName',
                value: 'Gawai'
            }
        })
        expect(wrapper.state('lastName')).toEqual('Gawai');
    })
})

describe('email input ', () => {
    it('responde to the change event and the change the state of the email', () => {
        const wrapper = shallow(<Register/>);
        wrapper.find('#email').simulate('change', {
            target: {
                name: 'email',
                value: 'aartigawai@gmail.com'
            }
        })
        expect(wrapper.state('email')).toEqual('aartigawai@gmail.com')
    })
})

describe('selectedOption input ', () => {
    it('responde to the change event and the change the state of the selectedOption', () => {
        const wrapper = shallow(<Register/>);
        wrapper.find('#selectedOption1').simulate('change', {
            target: {
                name: 'selectedOption',
                value: 'Basic'
            }
        })
        expect(wrapper.state('selectedOption')).toEqual('Basic')
    })
})

describe('password input ', () => {
    it('responde to the change event and the change the state of the password', () => {
        const wrapper = shallow(<Register/>);
        wrapper.find('#password').simulate('change', {
            target: {
                name: 'password',
                value: '1234567'
            }
        })
        expect(wrapper.state('password')).toEqual('1234567')
    })
})

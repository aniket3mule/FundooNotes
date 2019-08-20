import React  from 'react';
import { shallow } from '../testSetup';
import Register from '../components/RegistrationComponent';

describe('register component ', () => {
    it('Register details ', () => {
        expect(shallow(<Register/>).exists()).toBe(true);
    });

    it('Renders firstName input ', () => {
        expect(shallow(<Register/>).find('#firstName').length).toEqual(1);
    })

    it('Renders lastName input ', () => {
        expect(shallow(<Register/>).find('#lastName').length).toEqual(1);
    })

    it('Renders email input ', () => {
        expect(shallow(<Register/>).find('#email').length).toEqual(1);
    })

    it('Renders password input ', () => {
        expect(shallow(<Register/>).find('#password').length).toEqual(1);
    })
});

describe('firstName input ', () =>{
    it('respond to the change event and change the state of the firstName', () =>{
        const wrapper = shallow(<Register/>);
        wrapper.find('#firstName').simulate('change', {
            target: {
                name: 'firstName',
                value: 'Anuj'
            }
        })
        expect(wrapper.state('firstName')).toEqual('Anuj');
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
                value: 'anuj@gmail.com'
            }
        })
        expect(wrapper.state('email')).toEqual('anuj@gmail.com')
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

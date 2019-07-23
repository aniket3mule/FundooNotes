import React from 'react';
import { shallow } from '../testSetup';
import SignInComponent from '../components/SignInComponent';

describe('Login test ', () => {
    it('Check login details ', () => {
        expect(shallow(<SignInComponent />).exists()).toBe(true)
    });

    it('renders a email input ', () => {
        expect(shallow(<SignInComponent />).find('#email').length).toEqual(1);
    });

    it('render a password input ', () => {
        expect(shallow(<SignInComponent />).find('#password').length).toEqual(1)
    });
});

describe('email input ', () => {
    it('should respond to the change event and change the state of email ', () => {
        const wrapper = shallow(<SignInComponent />);
        wrapper.find('#email').simulate('change', {
            target: {
                name: 'email',
                value: 'aniketmule331@gmail.com'
            }
        });
        expect(wrapper.state('email')).toEqual('aniketmule331@gmail.com');
    });
})

    describe('password input', () => {
        it('should responde to the change event and change the state of password', () => {
            const wrapper = shallow(<SignInComponent />);
            wrapper.find('#password').simulate('change', {
                target: {
                    name: 'password',
                    value: '1234567'
                }
            });
            expect(wrapper.state('password')).toEqual('1234567');
        });
})
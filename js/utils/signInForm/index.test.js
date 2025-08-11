/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import {
    getByRole,
    getByTestId,
    getByLabelText
} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { handleSignInForm } from './index'
import SignIn from '../../pages/signIn/index'

beforeEach(() => {
    document.body.innerHTML = SignIn.render()
    handleSignInForm()
})

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('SignInForm Integration Test Suites', () => {
    it('should display the error message when the e-mail is not correct', () => {
        userEvent.type(
            getByLabelText(document.body, 'Votre addresse e-mail'),
            'thomas@thomas.com'
        )
        userEvent.click(
            getByRole(document.body, 'button')
        )
        expect(
            getByTestId(document.body, 'user-email-error-msg')
        ).not.toHaveClass('hidden')
    })

    it('should not display the error message when the e-mail is correct but it should display the password error message', () => {
        userEvent.type(
            getByLabelText(document.body, 'Votre addresse e-mail'),
            'thomas@facade.com'
        )
        userEvent.click(getByRole(document.body, 'button'))

        expect(
            getByTestId(document.body, 'user-email-error-msg')
        ).toHaveClass('hidden')

        expect(
            getByTestId(document.body, 'user-password-error-msg')
        ).not.toHaveClass('hidden')
    })

    it('should display the error password message when the password is not correct', () => {
        userEvent.type(
            getByLabelText(document.body, 'Votre addresse e-mail'),
            'thomas@facade.com'
        )

        userEvent.type(
            getByLabelText(document.body, 'Votre mot de passe'),
            'thomas'
        )

        userEvent.click(getByRole(document.body, 'button'))

        expect(
            getByTestId(document.body, 'user-password-error-msg')
        ).not.toHaveClass('hidden')
    })
    
    it('should not display any error message since both email & password are correct', () => {
        userEvent.type(
            getByLabelText(document.body, 'Votre addresse e-mail'),
            'thomas@facade.com'
        )

        userEvent.type(
            getByLabelText(document.body, 'Votre mot de passe'),
            'azerty'
        )

        userEvent.click(getByRole(document.body, 'button'))

        expect(
            getByTestId(document.body, 'user-email-error-msg')
        ).toHaveClass('hidden')

        expect(
            getByTestId(document.body, 'user-password-error-msg')
        ).toHaveClass('hidden')
    })
})
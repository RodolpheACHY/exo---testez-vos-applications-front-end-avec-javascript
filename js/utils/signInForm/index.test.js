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

import SignInPage from '../../pages/signIn/index'   // import de l'objet Signin
import { handleSignInForm } from './index'


beforeEach(() => {
    // Rendre le formulaire de connexion avant chaque test
    document.body.innerHTML = SignInPage.render()
    handleSignInForm()
})

afterEach(() => {
    document.body.innerHTML = ''
})

describe('SignInForm Integration Test Suites', () => {
    it('should display the error message when the e-mail is not correct', () => {
        // Simuler la saisie utilisateur du mauvais mail
        userEvent.type(
            getByLabelText(document.body, 'Votre addresse e-mail'),
            'thomas@thomas.com'
        )

        // Simuler le clic sur le bouton de connexion
        userEvent.click(getByRole(document.body, 'button'))

        // Vérifier que le message d'erreur est affiché
        expect(
            getByTestId(document.body, 'user-email-error-msg')
        ).not.toHaveClass('hidden')
    })

    it('should not display the error message when the e-mail is correct but it should display the password error message', () => {
        // Simuler la saisie utilisateur du bon mail
        userEvent.type(
            getByLabelText(document.body, 'Votre addresse e-mail'),
            'thomas@facadia.com'
        )

        // Simuler le clic sur le bouton de connexion
        userEvent.click(getByRole(document.body, 'button'))

        // Vérifier que le message d'erreur n'est pas affiché
        expect(
            getByTestId(document.body, 'user-email-error-msg')
        ).toHaveClass('hidden')

        // Vérifier que le message d'erreur est affiché
        expect(
            getByTestId(document.body, 'user-password-error-msg')
        ).not.toHaveClass('hidden')
    })

    it('should display the error password message when the password is not correct', () => {
        // Simuler la saisie utilisateur du bon mail
        userEvent.type(
            getByLabelText(document.body, 'Votre addresse e-mail'),
            'thomas@facadia.com'
        )

        // Simuler la saisie du mauvais password
        userEvent.type(
            getByLabelText(document.body, 'Votre mot de passe'),
            'thomas'
        )

        // Simuler le clic sur le bouton de connexion
        userEvent.click(getByRole(document.body, 'button'))

        // Vérifier que le message d'erreur est affiché
        expect(
            getByTestId(document.body, 'user-password-error-msg')
        ).not.toHaveClass('hidden')
    })
    
    it('should not display any error message since both email & password are correct', () => {
        // Simuler la saisie utilisateur du bon mail
        userEvent.type(
            getByLabelText(document.body, 'Votre addresse e-mail'),
            'thomas@facadia.com'
        )

        // Simuler la saisie du bon password
        userEvent.type(
            getByLabelText(document.body, 'Votre mot de passe'),
            'azerty'
        )

        // Simuler le clic sur le bouton de connexion
        userEvent.click(getByRole(document.body, 'button'))

        // Vérifier que le message d'erreur n'est pas affiché
        expect(
            getByTestId(document.body, 'user-email-error-msg')
        ).toHaveClass('hidden')

        // Vérifier que le message d'erreur n'est pas affiché
        expect(
            getByTestId(document.body, 'user-password-error-msg')
        ).toHaveClass('hidden')
    })
})
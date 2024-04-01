import React from 'react'
import { Provider } from 'react-redux'; // Import the Provider from react-redux
import store from '../Redux/Store';
import Write from './Write'

describe('<Write />', () => {
  it('renders', () => {
    cy.mount(
      <Provider store={store}> 
        <Write />
      </Provider>
    )
    cy.get('button').should('have.length', 1)
    cy.get('[data-cy=pagetitle]').should('have.text', 'Create post')
    
  })
})
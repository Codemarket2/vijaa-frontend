import CreateUserProfile from '../CreateUserProfile';
import { customMount } from '../../../../cypress/utils/mount';

describe('CreateUserProfile', () => {
  it('rendering CreateUserProfile', () => {
    customMount(CreateUserProfile);
    cy.get('[data-testid=cancerType]').should('exist');
    cy.get('[data-testid=date]').should('exist');
    cy.get('[data-testid=doctorName]').should('exist');
    cy.get('[data-testid=hospitalName]').should('exist');
    cy.get('[data-testid=add-button]').should('exist');
    cy.get('[data-testid=submit-button]').should('exist');
  });
});

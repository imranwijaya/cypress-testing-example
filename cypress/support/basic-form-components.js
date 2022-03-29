export function basicFormComponents(labelName, labelText, inputName) {
  it(`shows label '${labelText}'`, () => {
    cy.get(`[data-cy=label-${labelName}]`).should('have.text', labelText);
  })

  it(`has input '${inputName}'`, () => {
    cy.get(`[data-cy=input-${inputName}]`).should('exist');
  })
}
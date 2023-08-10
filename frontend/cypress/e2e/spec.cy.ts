describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.get("input").type("S");
    cy.get(".submit-button").click();

    cy.contains("String must contain at least 2 character(s)").should("exist");
  });
});

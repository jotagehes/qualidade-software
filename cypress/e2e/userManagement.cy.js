describe("User Management", () => {
  it("should list all users", () => {
    cy.visit("http://localhost:5173/");
  });

  it("should create a new users", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".RaCreateButton-root").click();
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("joao@joao.com");
    cy.get('input[name="password"]').type("123456");

    cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();
    cy.contains("Element created").should("be.visible");
    cy.visit("http://localhost:5173/");
    cy.contains("Test User").should("exist");
    cy.contains("joao@joao.com").should("exist");
  });

  it("should create a new user by pressing 'Enter' ", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".RaCreateButton-root").click();
    cy.get('input[name="name"]').type("New User");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("123456");

    cy.get('input[name="password"]').type("{enter}");

  });

  it("should edit an existing user", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Users").click();

    cy.get(".MuiTableBody-root > :nth-child(1)").click();

    cy.get('input[name="name"]').should("be.visible");

    cy.get('input[name="name"]').clear().type("Updated User");
    cy.get('input[name="email"]').clear().type("updated@joao.com");
    cy.get('input[name="password"]').clear().type("654321");

    cy.get('button[aria-label="Save"]').should("not.be.disabled").click();

    cy.contains("Element updated").should("be.visible");

    cy.contains("Users").click();

    cy.contains("Updated User").should("exist");
    cy.contains("updated@joao.com").should("exist");
  });

  it("should delete a user", () => {
    cy.visit("http://localhost:5173/");

    cy.get(".MuiTableBody-root > :nth-child(1)").click();
    cy.contains("button", "Delete").click();
    cy.contains("Element deleted").should("be.visible");
  });
});

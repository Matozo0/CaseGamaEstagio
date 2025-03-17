import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('Aluno e2e test', () => {
  const alunoPageUrl = '/aluno';
  const alunoPageUrlPattern = new RegExp('/aluno(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const alunoSample = {"nome":"profitable tuxedo"};

  let aluno;
  // let user;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: {"login":"G@H\\EI4R6h8\\YYKu\\.dP0yJC\\Cb","firstName":"Josh","lastName":"Larson","email":"Newell_Koch73@yahoo.com","imageUrl":"out whose","langKey":"faithfully"},
    }).then(({ body }) => {
      user = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/alunos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/alunos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/alunos/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [user],
    });

  });
   */

  afterEach(() => {
    if (aluno) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/alunos/${aluno.id}`,
      }).then(() => {
        aluno = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (user) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/users/${user.id}`,
      }).then(() => {
        user = undefined;
      });
    }
  });
   */

  it('Alunos menu should load Alunos page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('aluno');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Aluno').should('exist');
    cy.url().should('match', alunoPageUrlPattern);
  });

  describe('Aluno page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(alunoPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Aluno page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/aluno/new$'));
        cy.getEntityCreateUpdateHeading('Aluno');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', alunoPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/alunos',
          body: {
            ...alunoSample,
            user: user,
          },
        }).then(({ body }) => {
          aluno = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/alunos+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [aluno],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(alunoPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(alunoPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response?.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Aluno page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('aluno');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', alunoPageUrlPattern);
      });

      it('edit button click should load edit Aluno page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Aluno');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', alunoPageUrlPattern);
      });

      it('edit button click should load edit Aluno page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Aluno');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', alunoPageUrlPattern);
      });

      // Reason: cannot create a required entity with relationship with required relationships.
      it.skip('last delete button click should delete instance of Aluno', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('aluno').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', alunoPageUrlPattern);

        aluno = undefined;
      });
    });
  });

  describe('new Aluno page', () => {
    beforeEach(() => {
      cy.visit(`${alunoPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Aluno');
    });

    // Reason: cannot create a required entity with relationship with required relationships.
    it.skip('should create an instance of Aluno', () => {
      cy.get(`[data-cy="nome"]`).type('underplay');
      cy.get(`[data-cy="nome"]`).should('have.value', 'underplay');

      cy.get(`[data-cy="serie"]`).type('3');
      cy.get(`[data-cy="serie"]`).should('have.value', '3');

      cy.get(`[data-cy="jaFezEnem"]`).should('not.be.checked');
      cy.get(`[data-cy="jaFezEnem"]`).click();
      cy.get(`[data-cy="jaFezEnem"]`).should('be.checked');

      cy.get(`[data-cy="faculdadePreferida"]`).type('ultimately');
      cy.get(`[data-cy="faculdadePreferida"]`).should('have.value', 'ultimately');

      cy.get(`[data-cy="cursoPreferido"]`).type('andXX');
      cy.get(`[data-cy="cursoPreferido"]`).should('have.value', 'andXX');

      cy.get(`[data-cy="user"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        aluno = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', alunoPageUrlPattern);
    });
  });
});

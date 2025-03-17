package com.gamaestagio.app.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Aluno.
 */
@Entity
@Table(name = "alunos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Aluno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nome", nullable = false)
    private String nome;

    @Min(value = 1)
    @Max(value = 3)
    @Column(name = "serie")
    private Integer serie;

    @Column(name = "ja_fez_enem")
    private Boolean jaFezEnem;

    @Size(min = 3)
    @Column(name = "faculdade_preferida")
    private String faculdadePreferida;

    @Size(min = 5)
    @Column(name = "curso_preferido")
    private String cursoPreferido;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Aluno id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Aluno nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getSerie() {
        return this.serie;
    }

    public Aluno serie(Integer serie) {
        this.setSerie(serie);
        return this;
    }

    public void setSerie(Integer serie) {
        this.serie = serie;
    }

    public Boolean getJaFezEnem() {
        return this.jaFezEnem;
    }

    public Aluno jaFezEnem(Boolean jaFezEnem) {
        this.setJaFezEnem(jaFezEnem);
        return this;
    }

    public void setJaFezEnem(Boolean jaFezEnem) {
        this.jaFezEnem = jaFezEnem;
    }

    public String getFaculdadePreferida() {
        return this.faculdadePreferida;
    }

    public Aluno faculdadePreferida(String faculdadePreferida) {
        this.setFaculdadePreferida(faculdadePreferida);
        return this;
    }

    public void setFaculdadePreferida(String faculdadePreferida) {
        this.faculdadePreferida = faculdadePreferida;
    }

    public String getCursoPreferido() {
        return this.cursoPreferido;
    }

    public Aluno cursoPreferido(String cursoPreferido) {
        this.setCursoPreferido(cursoPreferido);
        return this;
    }

    public void setCursoPreferido(String cursoPreferido) {
        this.cursoPreferido = cursoPreferido;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Aluno user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aluno)) {
            return false;
        }
        return getId() != null && getId().equals(((Aluno) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Aluno{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", serie=" + getSerie() +
            ", jaFezEnem='" + getJaFezEnem() + "'" +
            ", faculdadePreferida='" + getFaculdadePreferida() + "'" +
            ", cursoPreferido='" + getCursoPreferido() + "'" +
            "}";
    }
}

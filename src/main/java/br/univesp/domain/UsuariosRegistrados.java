package br.univesp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UsuariosRegistrados.
 */
@Entity
@Table(name = "usuarios_registrados")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UsuariosRegistrados implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 4)
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "codigo_rfid", nullable = false)
    private String codigoRfid;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UsuariosRegistrados id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public UsuariosRegistrados nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCodigoRfid() {
        return this.codigoRfid;
    }

    public UsuariosRegistrados codigoRfid(String codigoRfid) {
        this.setCodigoRfid(codigoRfid);
        return this;
    }

    public void setCodigoRfid(String codigoRfid) {
        this.codigoRfid = codigoRfid;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UsuariosRegistrados)) {
            return false;
        }
        return getId() != null && getId().equals(((UsuariosRegistrados) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UsuariosRegistrados{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", codigoRfid='" + getCodigoRfid() + "'" +
            "}";
    }
}

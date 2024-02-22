package br.univesp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CadastroUsuarios.
 */
@Entity
@Table(name = "cadastro_usuarios")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CadastroUsuarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "codigo_rfid", nullable = false)
    private String codigoRfid;

    @NotNull
    @Column(name = "data_inclusao", nullable = false)
    private LocalDate dataInclusao;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CadastroUsuarios id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoRfid() {
        return this.codigoRfid;
    }

    public CadastroUsuarios codigoRfid(String codigoRfid) {
        this.setCodigoRfid(codigoRfid);
        return this;
    }

    public void setCodigoRfid(String codigoRfid) {
        this.codigoRfid = codigoRfid;
    }

    public LocalDate getDataInclusao() {
        return this.dataInclusao;
    }

    public CadastroUsuarios dataInclusao(LocalDate dataInclusao) {
        this.setDataInclusao(dataInclusao);
        return this;
    }

    public void setDataInclusao(LocalDate dataInclusao) {
        this.dataInclusao = dataInclusao;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CadastroUsuarios)) {
            return false;
        }
        return getId() != null && getId().equals(((CadastroUsuarios) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CadastroUsuarios{" +
            "id=" + getId() +
            ", codigoRfid='" + getCodigoRfid() + "'" +
            ", dataInclusao='" + getDataInclusao() + "'" +
            "}";
    }
}

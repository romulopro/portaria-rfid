package br.univesp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A LogAcesso.
 */
@Entity
@Table(name = "log_acesso")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LogAcesso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "codigo_rfid", nullable = false)
    private String codigoRfid;

    @NotNull
    @Column(name = "data_acesso", nullable = false)
    private LocalDate dataAcesso;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LogAcesso id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoRfid() {
        return this.codigoRfid;
    }

    public LogAcesso codigoRfid(String codigoRfid) {
        this.setCodigoRfid(codigoRfid);
        return this;
    }

    public void setCodigoRfid(String codigoRfid) {
        this.codigoRfid = codigoRfid;
    }

    public LocalDate getDataAcesso() {
        return this.dataAcesso;
    }

    public LogAcesso dataAcesso(LocalDate dataAcesso) {
        this.setDataAcesso(dataAcesso);
        return this;
    }

    public void setDataAcesso(LocalDate dataAcesso) {
        this.dataAcesso = dataAcesso;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LogAcesso)) {
            return false;
        }
        return getId() != null && getId().equals(((LogAcesso) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LogAcesso{" +
            "id=" + getId() +
            ", codigoRfid='" + getCodigoRfid() + "'" +
            ", dataAcesso='" + getDataAcesso() + "'" +
            "}";
    }
}

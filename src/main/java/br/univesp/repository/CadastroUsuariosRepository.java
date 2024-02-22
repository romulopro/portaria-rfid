package br.univesp.repository;

import br.univesp.domain.CadastroUsuarios;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CadastroUsuarios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CadastroUsuariosRepository extends JpaRepository<CadastroUsuarios, Long> {}

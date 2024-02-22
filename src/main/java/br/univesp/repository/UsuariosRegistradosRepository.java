package br.univesp.repository;

import br.univesp.domain.UsuariosRegistrados;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UsuariosRegistrados entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuariosRegistradosRepository extends JpaRepository<UsuariosRegistrados, Long> {}

package br.univesp.repository;

import br.univesp.domain.LogAcesso;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LogAcesso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LogAcessoRepository extends JpaRepository<LogAcesso, Long> {}

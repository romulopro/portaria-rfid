package br.univesp.web.rest;

import br.univesp.domain.LogAcesso;
import br.univesp.repository.LogAcessoRepository;
import br.univesp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.univesp.domain.LogAcesso}.
 */
@RestController
@RequestMapping("/api/log-acessos")
@Transactional
public class LogAcessoResource {

    private final Logger log = LoggerFactory.getLogger(LogAcessoResource.class);

    private static final String ENTITY_NAME = "logAcesso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LogAcessoRepository logAcessoRepository;

    public LogAcessoResource(LogAcessoRepository logAcessoRepository) {
        this.logAcessoRepository = logAcessoRepository;
    }

    /**
     * {@code POST  /log-acessos} : Create a new logAcesso.
     *
     * @param logAcesso the logAcesso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new logAcesso, or with status {@code 400 (Bad Request)} if the logAcesso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LogAcesso> createLogAcesso(@Valid @RequestBody LogAcesso logAcesso) throws URISyntaxException {
        log.debug("REST request to save LogAcesso : {}", logAcesso);
        if (logAcesso.getId() != null) {
            throw new BadRequestAlertException("A new logAcesso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LogAcesso result = logAcessoRepository.save(logAcesso);
        return ResponseEntity
            .created(new URI("/api/log-acessos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /log-acessos/:id} : Updates an existing logAcesso.
     *
     * @param id the id of the logAcesso to save.
     * @param logAcesso the logAcesso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated logAcesso,
     * or with status {@code 400 (Bad Request)} if the logAcesso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the logAcesso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LogAcesso> updateLogAcesso(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LogAcesso logAcesso
    ) throws URISyntaxException {
        log.debug("REST request to update LogAcesso : {}, {}", id, logAcesso);
        if (logAcesso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, logAcesso.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!logAcessoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LogAcesso result = logAcessoRepository.save(logAcesso);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, logAcesso.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /log-acessos/:id} : Partial updates given fields of an existing logAcesso, field will ignore if it is null
     *
     * @param id the id of the logAcesso to save.
     * @param logAcesso the logAcesso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated logAcesso,
     * or with status {@code 400 (Bad Request)} if the logAcesso is not valid,
     * or with status {@code 404 (Not Found)} if the logAcesso is not found,
     * or with status {@code 500 (Internal Server Error)} if the logAcesso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LogAcesso> partialUpdateLogAcesso(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LogAcesso logAcesso
    ) throws URISyntaxException {
        log.debug("REST request to partial update LogAcesso partially : {}, {}", id, logAcesso);
        if (logAcesso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, logAcesso.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!logAcessoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LogAcesso> result = logAcessoRepository
            .findById(logAcesso.getId())
            .map(existingLogAcesso -> {
                if (logAcesso.getCodigoRfid() != null) {
                    existingLogAcesso.setCodigoRfid(logAcesso.getCodigoRfid());
                }
                if (logAcesso.getDataAcesso() != null) {
                    existingLogAcesso.setDataAcesso(logAcesso.getDataAcesso());
                }

                return existingLogAcesso;
            })
            .map(logAcessoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, logAcesso.getId().toString())
        );
    }

    /**
     * {@code GET  /log-acessos} : get all the logAcessos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of logAcessos in body.
     */
    @GetMapping("")
    public List<LogAcesso> getAllLogAcessos() {
        log.debug("REST request to get all LogAcessos");
        return logAcessoRepository.findAll();
    }

    /**
     * {@code GET  /log-acessos/:id} : get the "id" logAcesso.
     *
     * @param id the id of the logAcesso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the logAcesso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LogAcesso> getLogAcesso(@PathVariable("id") Long id) {
        log.debug("REST request to get LogAcesso : {}", id);
        Optional<LogAcesso> logAcesso = logAcessoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(logAcesso);
    }

    /**
     * {@code DELETE  /log-acessos/:id} : delete the "id" logAcesso.
     *
     * @param id the id of the logAcesso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogAcesso(@PathVariable("id") Long id) {
        log.debug("REST request to delete LogAcesso : {}", id);
        logAcessoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

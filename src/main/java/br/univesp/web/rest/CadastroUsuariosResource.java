package br.univesp.web.rest;

import br.univesp.domain.CadastroUsuarios;
import br.univesp.repository.CadastroUsuariosRepository;
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
 * REST controller for managing {@link br.univesp.domain.CadastroUsuarios}.
 */
@RestController
@RequestMapping("/api/cadastro-usuarios")
@Transactional
public class CadastroUsuariosResource {

    private final Logger log = LoggerFactory.getLogger(CadastroUsuariosResource.class);

    private static final String ENTITY_NAME = "cadastroUsuarios";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CadastroUsuariosRepository cadastroUsuariosRepository;

    public CadastroUsuariosResource(CadastroUsuariosRepository cadastroUsuariosRepository) {
        this.cadastroUsuariosRepository = cadastroUsuariosRepository;
    }

    /**
     * {@code POST  /cadastro-usuarios} : Create a new cadastroUsuarios.
     *
     * @param cadastroUsuarios the cadastroUsuarios to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cadastroUsuarios, or with status {@code 400 (Bad Request)} if the cadastroUsuarios has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CadastroUsuarios> createCadastroUsuarios(@Valid @RequestBody CadastroUsuarios cadastroUsuarios)
        throws URISyntaxException {
        log.debug("REST request to save CadastroUsuarios : {}", cadastroUsuarios);
        if (cadastroUsuarios.getId() != null) {
            throw new BadRequestAlertException("A new cadastroUsuarios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CadastroUsuarios result = cadastroUsuariosRepository.save(cadastroUsuarios);
        return ResponseEntity
            .created(new URI("/api/cadastro-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cadastro-usuarios/:id} : Updates an existing cadastroUsuarios.
     *
     * @param id the id of the cadastroUsuarios to save.
     * @param cadastroUsuarios the cadastroUsuarios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cadastroUsuarios,
     * or with status {@code 400 (Bad Request)} if the cadastroUsuarios is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cadastroUsuarios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CadastroUsuarios> updateCadastroUsuarios(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CadastroUsuarios cadastroUsuarios
    ) throws URISyntaxException {
        log.debug("REST request to update CadastroUsuarios : {}, {}", id, cadastroUsuarios);
        if (cadastroUsuarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cadastroUsuarios.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cadastroUsuariosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CadastroUsuarios result = cadastroUsuariosRepository.save(cadastroUsuarios);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cadastroUsuarios.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cadastro-usuarios/:id} : Partial updates given fields of an existing cadastroUsuarios, field will ignore if it is null
     *
     * @param id the id of the cadastroUsuarios to save.
     * @param cadastroUsuarios the cadastroUsuarios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cadastroUsuarios,
     * or with status {@code 400 (Bad Request)} if the cadastroUsuarios is not valid,
     * or with status {@code 404 (Not Found)} if the cadastroUsuarios is not found,
     * or with status {@code 500 (Internal Server Error)} if the cadastroUsuarios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CadastroUsuarios> partialUpdateCadastroUsuarios(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CadastroUsuarios cadastroUsuarios
    ) throws URISyntaxException {
        log.debug("REST request to partial update CadastroUsuarios partially : {}, {}", id, cadastroUsuarios);
        if (cadastroUsuarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cadastroUsuarios.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cadastroUsuariosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CadastroUsuarios> result = cadastroUsuariosRepository
            .findById(cadastroUsuarios.getId())
            .map(existingCadastroUsuarios -> {
                if (cadastroUsuarios.getCodigoRfid() != null) {
                    existingCadastroUsuarios.setCodigoRfid(cadastroUsuarios.getCodigoRfid());
                }
                if (cadastroUsuarios.getDataInclusao() != null) {
                    existingCadastroUsuarios.setDataInclusao(cadastroUsuarios.getDataInclusao());
                }

                return existingCadastroUsuarios;
            })
            .map(cadastroUsuariosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cadastroUsuarios.getId().toString())
        );
    }

    /**
     * {@code GET  /cadastro-usuarios} : get all the cadastroUsuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cadastroUsuarios in body.
     */
    @GetMapping("")
    public List<CadastroUsuarios> getAllCadastroUsuarios() {
        log.debug("REST request to get all CadastroUsuarios");
        return cadastroUsuariosRepository.findAll();
    }

    /**
     * {@code GET  /cadastro-usuarios/:id} : get the "id" cadastroUsuarios.
     *
     * @param id the id of the cadastroUsuarios to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cadastroUsuarios, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CadastroUsuarios> getCadastroUsuarios(@PathVariable("id") Long id) {
        log.debug("REST request to get CadastroUsuarios : {}", id);
        Optional<CadastroUsuarios> cadastroUsuarios = cadastroUsuariosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cadastroUsuarios);
    }

    /**
     * {@code DELETE  /cadastro-usuarios/:id} : delete the "id" cadastroUsuarios.
     *
     * @param id the id of the cadastroUsuarios to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCadastroUsuarios(@PathVariable("id") Long id) {
        log.debug("REST request to delete CadastroUsuarios : {}", id);
        cadastroUsuariosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

package br.univesp.web.rest;

import br.univesp.domain.UsuariosRegistrados;
import br.univesp.repository.UsuariosRegistradosRepository;
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
 * REST controller for managing {@link br.univesp.domain.UsuariosRegistrados}.
 */
@RestController
@RequestMapping("/api/usuarios-registrados")
@Transactional
public class UsuariosRegistradosResource {

    private final Logger log = LoggerFactory.getLogger(UsuariosRegistradosResource.class);

    private static final String ENTITY_NAME = "usuariosRegistrados";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UsuariosRegistradosRepository usuariosRegistradosRepository;

    public UsuariosRegistradosResource(UsuariosRegistradosRepository usuariosRegistradosRepository) {
        this.usuariosRegistradosRepository = usuariosRegistradosRepository;
    }

    /**
     * {@code POST  /usuarios-registrados} : Create a new usuariosRegistrados.
     *
     * @param usuariosRegistrados the usuariosRegistrados to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new usuariosRegistrados, or with status {@code 400 (Bad Request)} if the usuariosRegistrados has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<UsuariosRegistrados> createUsuariosRegistrados(@Valid @RequestBody UsuariosRegistrados usuariosRegistrados)
        throws URISyntaxException {
        log.debug("REST request to save UsuariosRegistrados : {}", usuariosRegistrados);
        if (usuariosRegistrados.getId() != null) {
            throw new BadRequestAlertException("A new usuariosRegistrados cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UsuariosRegistrados result = usuariosRegistradosRepository.save(usuariosRegistrados);
        return ResponseEntity
            .created(new URI("/api/usuarios-registrados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /usuarios-registrados/:id} : Updates an existing usuariosRegistrados.
     *
     * @param id the id of the usuariosRegistrados to save.
     * @param usuariosRegistrados the usuariosRegistrados to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuariosRegistrados,
     * or with status {@code 400 (Bad Request)} if the usuariosRegistrados is not valid,
     * or with status {@code 500 (Internal Server Error)} if the usuariosRegistrados couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UsuariosRegistrados> updateUsuariosRegistrados(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody UsuariosRegistrados usuariosRegistrados
    ) throws URISyntaxException {
        log.debug("REST request to update UsuariosRegistrados : {}, {}", id, usuariosRegistrados);
        if (usuariosRegistrados.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, usuariosRegistrados.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usuariosRegistradosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UsuariosRegistrados result = usuariosRegistradosRepository.save(usuariosRegistrados);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, usuariosRegistrados.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /usuarios-registrados/:id} : Partial updates given fields of an existing usuariosRegistrados, field will ignore if it is null
     *
     * @param id the id of the usuariosRegistrados to save.
     * @param usuariosRegistrados the usuariosRegistrados to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuariosRegistrados,
     * or with status {@code 400 (Bad Request)} if the usuariosRegistrados is not valid,
     * or with status {@code 404 (Not Found)} if the usuariosRegistrados is not found,
     * or with status {@code 500 (Internal Server Error)} if the usuariosRegistrados couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UsuariosRegistrados> partialUpdateUsuariosRegistrados(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody UsuariosRegistrados usuariosRegistrados
    ) throws URISyntaxException {
        log.debug("REST request to partial update UsuariosRegistrados partially : {}, {}", id, usuariosRegistrados);
        if (usuariosRegistrados.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, usuariosRegistrados.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usuariosRegistradosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UsuariosRegistrados> result = usuariosRegistradosRepository
            .findById(usuariosRegistrados.getId())
            .map(existingUsuariosRegistrados -> {
                if (usuariosRegistrados.getNome() != null) {
                    existingUsuariosRegistrados.setNome(usuariosRegistrados.getNome());
                }
                if (usuariosRegistrados.getCodigoRfid() != null) {
                    existingUsuariosRegistrados.setCodigoRfid(usuariosRegistrados.getCodigoRfid());
                }

                return existingUsuariosRegistrados;
            })
            .map(usuariosRegistradosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, usuariosRegistrados.getId().toString())
        );
    }

    /**
     * {@code GET  /usuarios-registrados} : get all the usuariosRegistrados.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of usuariosRegistrados in body.
     */
    @GetMapping("")
    public List<UsuariosRegistrados> getAllUsuariosRegistrados() {
        log.debug("REST request to get all UsuariosRegistrados");
        return usuariosRegistradosRepository.findAll();
    }

    /**
     * {@code GET  /usuarios-registrados/:id} : get the "id" usuariosRegistrados.
     *
     * @param id the id of the usuariosRegistrados to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the usuariosRegistrados, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UsuariosRegistrados> getUsuariosRegistrados(@PathVariable("id") Long id) {
        log.debug("REST request to get UsuariosRegistrados : {}", id);
        Optional<UsuariosRegistrados> usuariosRegistrados = usuariosRegistradosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(usuariosRegistrados);
    }

    /**
     * {@code DELETE  /usuarios-registrados/:id} : delete the "id" usuariosRegistrados.
     *
     * @param id the id of the usuariosRegistrados to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuariosRegistrados(@PathVariable("id") Long id) {
        log.debug("REST request to delete UsuariosRegistrados : {}", id);
        usuariosRegistradosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

package br.univesp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.univesp.IntegrationTest;
import br.univesp.domain.UsuariosRegistrados;
import br.univesp.repository.UsuariosRegistradosRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link UsuariosRegistradosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UsuariosRegistradosResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO_RFID = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_RFID = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/usuarios-registrados";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UsuariosRegistradosRepository usuariosRegistradosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUsuariosRegistradosMockMvc;

    private UsuariosRegistrados usuariosRegistrados;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UsuariosRegistrados createEntity(EntityManager em) {
        UsuariosRegistrados usuariosRegistrados = new UsuariosRegistrados().nome(DEFAULT_NOME).codigoRfid(DEFAULT_CODIGO_RFID);
        return usuariosRegistrados;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UsuariosRegistrados createUpdatedEntity(EntityManager em) {
        UsuariosRegistrados usuariosRegistrados = new UsuariosRegistrados().nome(UPDATED_NOME).codigoRfid(UPDATED_CODIGO_RFID);
        return usuariosRegistrados;
    }

    @BeforeEach
    public void initTest() {
        usuariosRegistrados = createEntity(em);
    }

    @Test
    @Transactional
    void createUsuariosRegistrados() throws Exception {
        int databaseSizeBeforeCreate = usuariosRegistradosRepository.findAll().size();
        // Create the UsuariosRegistrados
        restUsuariosRegistradosMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuariosRegistrados))
            )
            .andExpect(status().isCreated());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeCreate + 1);
        UsuariosRegistrados testUsuariosRegistrados = usuariosRegistradosList.get(usuariosRegistradosList.size() - 1);
        assertThat(testUsuariosRegistrados.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testUsuariosRegistrados.getCodigoRfid()).isEqualTo(DEFAULT_CODIGO_RFID);
    }

    @Test
    @Transactional
    void createUsuariosRegistradosWithExistingId() throws Exception {
        // Create the UsuariosRegistrados with an existing ID
        usuariosRegistrados.setId(1L);

        int databaseSizeBeforeCreate = usuariosRegistradosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuariosRegistradosMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuariosRegistrados))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosRegistradosRepository.findAll().size();
        // set the field null
        usuariosRegistrados.setNome(null);

        // Create the UsuariosRegistrados, which fails.

        restUsuariosRegistradosMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuariosRegistrados))
            )
            .andExpect(status().isBadRequest());

        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCodigoRfidIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosRegistradosRepository.findAll().size();
        // set the field null
        usuariosRegistrados.setCodigoRfid(null);

        // Create the UsuariosRegistrados, which fails.

        restUsuariosRegistradosMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuariosRegistrados))
            )
            .andExpect(status().isBadRequest());

        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllUsuariosRegistrados() throws Exception {
        // Initialize the database
        usuariosRegistradosRepository.saveAndFlush(usuariosRegistrados);

        // Get all the usuariosRegistradosList
        restUsuariosRegistradosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuariosRegistrados.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].codigoRfid").value(hasItem(DEFAULT_CODIGO_RFID)));
    }

    @Test
    @Transactional
    void getUsuariosRegistrados() throws Exception {
        // Initialize the database
        usuariosRegistradosRepository.saveAndFlush(usuariosRegistrados);

        // Get the usuariosRegistrados
        restUsuariosRegistradosMockMvc
            .perform(get(ENTITY_API_URL_ID, usuariosRegistrados.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(usuariosRegistrados.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.codigoRfid").value(DEFAULT_CODIGO_RFID));
    }

    @Test
    @Transactional
    void getNonExistingUsuariosRegistrados() throws Exception {
        // Get the usuariosRegistrados
        restUsuariosRegistradosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUsuariosRegistrados() throws Exception {
        // Initialize the database
        usuariosRegistradosRepository.saveAndFlush(usuariosRegistrados);

        int databaseSizeBeforeUpdate = usuariosRegistradosRepository.findAll().size();

        // Update the usuariosRegistrados
        UsuariosRegistrados updatedUsuariosRegistrados = usuariosRegistradosRepository.findById(usuariosRegistrados.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedUsuariosRegistrados are not directly saved in db
        em.detach(updatedUsuariosRegistrados);
        updatedUsuariosRegistrados.nome(UPDATED_NOME).codigoRfid(UPDATED_CODIGO_RFID);

        restUsuariosRegistradosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUsuariosRegistrados.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUsuariosRegistrados))
            )
            .andExpect(status().isOk());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeUpdate);
        UsuariosRegistrados testUsuariosRegistrados = usuariosRegistradosList.get(usuariosRegistradosList.size() - 1);
        assertThat(testUsuariosRegistrados.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testUsuariosRegistrados.getCodigoRfid()).isEqualTo(UPDATED_CODIGO_RFID);
    }

    @Test
    @Transactional
    void putNonExistingUsuariosRegistrados() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRegistradosRepository.findAll().size();
        usuariosRegistrados.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuariosRegistradosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, usuariosRegistrados.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuariosRegistrados))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUsuariosRegistrados() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRegistradosRepository.findAll().size();
        usuariosRegistrados.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuariosRegistradosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuariosRegistrados))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUsuariosRegistrados() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRegistradosRepository.findAll().size();
        usuariosRegistrados.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuariosRegistradosMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuariosRegistrados))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUsuariosRegistradosWithPatch() throws Exception {
        // Initialize the database
        usuariosRegistradosRepository.saveAndFlush(usuariosRegistrados);

        int databaseSizeBeforeUpdate = usuariosRegistradosRepository.findAll().size();

        // Update the usuariosRegistrados using partial update
        UsuariosRegistrados partialUpdatedUsuariosRegistrados = new UsuariosRegistrados();
        partialUpdatedUsuariosRegistrados.setId(usuariosRegistrados.getId());

        restUsuariosRegistradosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuariosRegistrados.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuariosRegistrados))
            )
            .andExpect(status().isOk());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeUpdate);
        UsuariosRegistrados testUsuariosRegistrados = usuariosRegistradosList.get(usuariosRegistradosList.size() - 1);
        assertThat(testUsuariosRegistrados.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testUsuariosRegistrados.getCodigoRfid()).isEqualTo(DEFAULT_CODIGO_RFID);
    }

    @Test
    @Transactional
    void fullUpdateUsuariosRegistradosWithPatch() throws Exception {
        // Initialize the database
        usuariosRegistradosRepository.saveAndFlush(usuariosRegistrados);

        int databaseSizeBeforeUpdate = usuariosRegistradosRepository.findAll().size();

        // Update the usuariosRegistrados using partial update
        UsuariosRegistrados partialUpdatedUsuariosRegistrados = new UsuariosRegistrados();
        partialUpdatedUsuariosRegistrados.setId(usuariosRegistrados.getId());

        partialUpdatedUsuariosRegistrados.nome(UPDATED_NOME).codigoRfid(UPDATED_CODIGO_RFID);

        restUsuariosRegistradosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuariosRegistrados.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuariosRegistrados))
            )
            .andExpect(status().isOk());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeUpdate);
        UsuariosRegistrados testUsuariosRegistrados = usuariosRegistradosList.get(usuariosRegistradosList.size() - 1);
        assertThat(testUsuariosRegistrados.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testUsuariosRegistrados.getCodigoRfid()).isEqualTo(UPDATED_CODIGO_RFID);
    }

    @Test
    @Transactional
    void patchNonExistingUsuariosRegistrados() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRegistradosRepository.findAll().size();
        usuariosRegistrados.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuariosRegistradosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, usuariosRegistrados.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuariosRegistrados))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUsuariosRegistrados() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRegistradosRepository.findAll().size();
        usuariosRegistrados.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuariosRegistradosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuariosRegistrados))
            )
            .andExpect(status().isBadRequest());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUsuariosRegistrados() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRegistradosRepository.findAll().size();
        usuariosRegistrados.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuariosRegistradosMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuariosRegistrados))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UsuariosRegistrados in the database
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUsuariosRegistrados() throws Exception {
        // Initialize the database
        usuariosRegistradosRepository.saveAndFlush(usuariosRegistrados);

        int databaseSizeBeforeDelete = usuariosRegistradosRepository.findAll().size();

        // Delete the usuariosRegistrados
        restUsuariosRegistradosMockMvc
            .perform(delete(ENTITY_API_URL_ID, usuariosRegistrados.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UsuariosRegistrados> usuariosRegistradosList = usuariosRegistradosRepository.findAll();
        assertThat(usuariosRegistradosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

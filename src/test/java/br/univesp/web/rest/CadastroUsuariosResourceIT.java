package br.univesp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.univesp.IntegrationTest;
import br.univesp.domain.CadastroUsuarios;
import br.univesp.repository.CadastroUsuariosRepository;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link CadastroUsuariosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CadastroUsuariosResourceIT {

    private static final String DEFAULT_CODIGO_RFID = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_RFID = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_INCLUSAO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INCLUSAO = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/cadastro-usuarios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CadastroUsuariosRepository cadastroUsuariosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCadastroUsuariosMockMvc;

    private CadastroUsuarios cadastroUsuarios;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CadastroUsuarios createEntity(EntityManager em) {
        CadastroUsuarios cadastroUsuarios = new CadastroUsuarios().codigoRfid(DEFAULT_CODIGO_RFID).dataInclusao(DEFAULT_DATA_INCLUSAO);
        return cadastroUsuarios;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CadastroUsuarios createUpdatedEntity(EntityManager em) {
        CadastroUsuarios cadastroUsuarios = new CadastroUsuarios().codigoRfid(UPDATED_CODIGO_RFID).dataInclusao(UPDATED_DATA_INCLUSAO);
        return cadastroUsuarios;
    }

    @BeforeEach
    public void initTest() {
        cadastroUsuarios = createEntity(em);
    }

    @Test
    @Transactional
    void createCadastroUsuarios() throws Exception {
        int databaseSizeBeforeCreate = cadastroUsuariosRepository.findAll().size();
        // Create the CadastroUsuarios
        restCadastroUsuariosMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cadastroUsuarios))
            )
            .andExpect(status().isCreated());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeCreate + 1);
        CadastroUsuarios testCadastroUsuarios = cadastroUsuariosList.get(cadastroUsuariosList.size() - 1);
        assertThat(testCadastroUsuarios.getCodigoRfid()).isEqualTo(DEFAULT_CODIGO_RFID);
        assertThat(testCadastroUsuarios.getDataInclusao()).isEqualTo(DEFAULT_DATA_INCLUSAO);
    }

    @Test
    @Transactional
    void createCadastroUsuariosWithExistingId() throws Exception {
        // Create the CadastroUsuarios with an existing ID
        cadastroUsuarios.setId(1L);

        int databaseSizeBeforeCreate = cadastroUsuariosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCadastroUsuariosMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cadastroUsuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCodigoRfidIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadastroUsuariosRepository.findAll().size();
        // set the field null
        cadastroUsuarios.setCodigoRfid(null);

        // Create the CadastroUsuarios, which fails.

        restCadastroUsuariosMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cadastroUsuarios))
            )
            .andExpect(status().isBadRequest());

        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDataInclusaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cadastroUsuariosRepository.findAll().size();
        // set the field null
        cadastroUsuarios.setDataInclusao(null);

        // Create the CadastroUsuarios, which fails.

        restCadastroUsuariosMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cadastroUsuarios))
            )
            .andExpect(status().isBadRequest());

        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCadastroUsuarios() throws Exception {
        // Initialize the database
        cadastroUsuariosRepository.saveAndFlush(cadastroUsuarios);

        // Get all the cadastroUsuariosList
        restCadastroUsuariosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cadastroUsuarios.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoRfid").value(hasItem(DEFAULT_CODIGO_RFID)))
            .andExpect(jsonPath("$.[*].dataInclusao").value(hasItem(DEFAULT_DATA_INCLUSAO.toString())));
    }

    @Test
    @Transactional
    void getCadastroUsuarios() throws Exception {
        // Initialize the database
        cadastroUsuariosRepository.saveAndFlush(cadastroUsuarios);

        // Get the cadastroUsuarios
        restCadastroUsuariosMockMvc
            .perform(get(ENTITY_API_URL_ID, cadastroUsuarios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cadastroUsuarios.getId().intValue()))
            .andExpect(jsonPath("$.codigoRfid").value(DEFAULT_CODIGO_RFID))
            .andExpect(jsonPath("$.dataInclusao").value(DEFAULT_DATA_INCLUSAO.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCadastroUsuarios() throws Exception {
        // Get the cadastroUsuarios
        restCadastroUsuariosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCadastroUsuarios() throws Exception {
        // Initialize the database
        cadastroUsuariosRepository.saveAndFlush(cadastroUsuarios);

        int databaseSizeBeforeUpdate = cadastroUsuariosRepository.findAll().size();

        // Update the cadastroUsuarios
        CadastroUsuarios updatedCadastroUsuarios = cadastroUsuariosRepository.findById(cadastroUsuarios.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCadastroUsuarios are not directly saved in db
        em.detach(updatedCadastroUsuarios);
        updatedCadastroUsuarios.codigoRfid(UPDATED_CODIGO_RFID).dataInclusao(UPDATED_DATA_INCLUSAO);

        restCadastroUsuariosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCadastroUsuarios.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCadastroUsuarios))
            )
            .andExpect(status().isOk());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeUpdate);
        CadastroUsuarios testCadastroUsuarios = cadastroUsuariosList.get(cadastroUsuariosList.size() - 1);
        assertThat(testCadastroUsuarios.getCodigoRfid()).isEqualTo(UPDATED_CODIGO_RFID);
        assertThat(testCadastroUsuarios.getDataInclusao()).isEqualTo(UPDATED_DATA_INCLUSAO);
    }

    @Test
    @Transactional
    void putNonExistingCadastroUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = cadastroUsuariosRepository.findAll().size();
        cadastroUsuarios.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCadastroUsuariosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cadastroUsuarios.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cadastroUsuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCadastroUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = cadastroUsuariosRepository.findAll().size();
        cadastroUsuarios.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCadastroUsuariosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cadastroUsuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCadastroUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = cadastroUsuariosRepository.findAll().size();
        cadastroUsuarios.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCadastroUsuariosMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cadastroUsuarios))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCadastroUsuariosWithPatch() throws Exception {
        // Initialize the database
        cadastroUsuariosRepository.saveAndFlush(cadastroUsuarios);

        int databaseSizeBeforeUpdate = cadastroUsuariosRepository.findAll().size();

        // Update the cadastroUsuarios using partial update
        CadastroUsuarios partialUpdatedCadastroUsuarios = new CadastroUsuarios();
        partialUpdatedCadastroUsuarios.setId(cadastroUsuarios.getId());

        restCadastroUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCadastroUsuarios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCadastroUsuarios))
            )
            .andExpect(status().isOk());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeUpdate);
        CadastroUsuarios testCadastroUsuarios = cadastroUsuariosList.get(cadastroUsuariosList.size() - 1);
        assertThat(testCadastroUsuarios.getCodigoRfid()).isEqualTo(DEFAULT_CODIGO_RFID);
        assertThat(testCadastroUsuarios.getDataInclusao()).isEqualTo(DEFAULT_DATA_INCLUSAO);
    }

    @Test
    @Transactional
    void fullUpdateCadastroUsuariosWithPatch() throws Exception {
        // Initialize the database
        cadastroUsuariosRepository.saveAndFlush(cadastroUsuarios);

        int databaseSizeBeforeUpdate = cadastroUsuariosRepository.findAll().size();

        // Update the cadastroUsuarios using partial update
        CadastroUsuarios partialUpdatedCadastroUsuarios = new CadastroUsuarios();
        partialUpdatedCadastroUsuarios.setId(cadastroUsuarios.getId());

        partialUpdatedCadastroUsuarios.codigoRfid(UPDATED_CODIGO_RFID).dataInclusao(UPDATED_DATA_INCLUSAO);

        restCadastroUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCadastroUsuarios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCadastroUsuarios))
            )
            .andExpect(status().isOk());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeUpdate);
        CadastroUsuarios testCadastroUsuarios = cadastroUsuariosList.get(cadastroUsuariosList.size() - 1);
        assertThat(testCadastroUsuarios.getCodigoRfid()).isEqualTo(UPDATED_CODIGO_RFID);
        assertThat(testCadastroUsuarios.getDataInclusao()).isEqualTo(UPDATED_DATA_INCLUSAO);
    }

    @Test
    @Transactional
    void patchNonExistingCadastroUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = cadastroUsuariosRepository.findAll().size();
        cadastroUsuarios.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCadastroUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cadastroUsuarios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cadastroUsuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCadastroUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = cadastroUsuariosRepository.findAll().size();
        cadastroUsuarios.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCadastroUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cadastroUsuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCadastroUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = cadastroUsuariosRepository.findAll().size();
        cadastroUsuarios.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCadastroUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cadastroUsuarios))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CadastroUsuarios in the database
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCadastroUsuarios() throws Exception {
        // Initialize the database
        cadastroUsuariosRepository.saveAndFlush(cadastroUsuarios);

        int databaseSizeBeforeDelete = cadastroUsuariosRepository.findAll().size();

        // Delete the cadastroUsuarios
        restCadastroUsuariosMockMvc
            .perform(delete(ENTITY_API_URL_ID, cadastroUsuarios.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CadastroUsuarios> cadastroUsuariosList = cadastroUsuariosRepository.findAll();
        assertThat(cadastroUsuariosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

package br.univesp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.univesp.IntegrationTest;
import br.univesp.domain.LogAcesso;
import br.univesp.repository.LogAcessoRepository;
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
 * Integration tests for the {@link LogAcessoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LogAcessoResourceIT {

    private static final String DEFAULT_CODIGO_RFID = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_RFID = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_ACESSO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_ACESSO = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/log-acessos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LogAcessoRepository logAcessoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLogAcessoMockMvc;

    private LogAcesso logAcesso;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LogAcesso createEntity(EntityManager em) {
        LogAcesso logAcesso = new LogAcesso().codigoRfid(DEFAULT_CODIGO_RFID).dataAcesso(DEFAULT_DATA_ACESSO);
        return logAcesso;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LogAcesso createUpdatedEntity(EntityManager em) {
        LogAcesso logAcesso = new LogAcesso().codigoRfid(UPDATED_CODIGO_RFID).dataAcesso(UPDATED_DATA_ACESSO);
        return logAcesso;
    }

    @BeforeEach
    public void initTest() {
        logAcesso = createEntity(em);
    }

    @Test
    @Transactional
    void createLogAcesso() throws Exception {
        int databaseSizeBeforeCreate = logAcessoRepository.findAll().size();
        // Create the LogAcesso
        restLogAcessoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(logAcesso)))
            .andExpect(status().isCreated());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeCreate + 1);
        LogAcesso testLogAcesso = logAcessoList.get(logAcessoList.size() - 1);
        assertThat(testLogAcesso.getCodigoRfid()).isEqualTo(DEFAULT_CODIGO_RFID);
        assertThat(testLogAcesso.getDataAcesso()).isEqualTo(DEFAULT_DATA_ACESSO);
    }

    @Test
    @Transactional
    void createLogAcessoWithExistingId() throws Exception {
        // Create the LogAcesso with an existing ID
        logAcesso.setId(1L);

        int databaseSizeBeforeCreate = logAcessoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLogAcessoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(logAcesso)))
            .andExpect(status().isBadRequest());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCodigoRfidIsRequired() throws Exception {
        int databaseSizeBeforeTest = logAcessoRepository.findAll().size();
        // set the field null
        logAcesso.setCodigoRfid(null);

        // Create the LogAcesso, which fails.

        restLogAcessoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(logAcesso)))
            .andExpect(status().isBadRequest());

        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDataAcessoIsRequired() throws Exception {
        int databaseSizeBeforeTest = logAcessoRepository.findAll().size();
        // set the field null
        logAcesso.setDataAcesso(null);

        // Create the LogAcesso, which fails.

        restLogAcessoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(logAcesso)))
            .andExpect(status().isBadRequest());

        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllLogAcessos() throws Exception {
        // Initialize the database
        logAcessoRepository.saveAndFlush(logAcesso);

        // Get all the logAcessoList
        restLogAcessoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(logAcesso.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoRfid").value(hasItem(DEFAULT_CODIGO_RFID)))
            .andExpect(jsonPath("$.[*].dataAcesso").value(hasItem(DEFAULT_DATA_ACESSO.toString())));
    }

    @Test
    @Transactional
    void getLogAcesso() throws Exception {
        // Initialize the database
        logAcessoRepository.saveAndFlush(logAcesso);

        // Get the logAcesso
        restLogAcessoMockMvc
            .perform(get(ENTITY_API_URL_ID, logAcesso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(logAcesso.getId().intValue()))
            .andExpect(jsonPath("$.codigoRfid").value(DEFAULT_CODIGO_RFID))
            .andExpect(jsonPath("$.dataAcesso").value(DEFAULT_DATA_ACESSO.toString()));
    }

    @Test
    @Transactional
    void getNonExistingLogAcesso() throws Exception {
        // Get the logAcesso
        restLogAcessoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLogAcesso() throws Exception {
        // Initialize the database
        logAcessoRepository.saveAndFlush(logAcesso);

        int databaseSizeBeforeUpdate = logAcessoRepository.findAll().size();

        // Update the logAcesso
        LogAcesso updatedLogAcesso = logAcessoRepository.findById(logAcesso.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedLogAcesso are not directly saved in db
        em.detach(updatedLogAcesso);
        updatedLogAcesso.codigoRfid(UPDATED_CODIGO_RFID).dataAcesso(UPDATED_DATA_ACESSO);

        restLogAcessoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLogAcesso.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLogAcesso))
            )
            .andExpect(status().isOk());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeUpdate);
        LogAcesso testLogAcesso = logAcessoList.get(logAcessoList.size() - 1);
        assertThat(testLogAcesso.getCodigoRfid()).isEqualTo(UPDATED_CODIGO_RFID);
        assertThat(testLogAcesso.getDataAcesso()).isEqualTo(UPDATED_DATA_ACESSO);
    }

    @Test
    @Transactional
    void putNonExistingLogAcesso() throws Exception {
        int databaseSizeBeforeUpdate = logAcessoRepository.findAll().size();
        logAcesso.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLogAcessoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, logAcesso.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(logAcesso))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLogAcesso() throws Exception {
        int databaseSizeBeforeUpdate = logAcessoRepository.findAll().size();
        logAcesso.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogAcessoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(logAcesso))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLogAcesso() throws Exception {
        int databaseSizeBeforeUpdate = logAcessoRepository.findAll().size();
        logAcesso.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogAcessoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(logAcesso)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLogAcessoWithPatch() throws Exception {
        // Initialize the database
        logAcessoRepository.saveAndFlush(logAcesso);

        int databaseSizeBeforeUpdate = logAcessoRepository.findAll().size();

        // Update the logAcesso using partial update
        LogAcesso partialUpdatedLogAcesso = new LogAcesso();
        partialUpdatedLogAcesso.setId(logAcesso.getId());

        partialUpdatedLogAcesso.codigoRfid(UPDATED_CODIGO_RFID).dataAcesso(UPDATED_DATA_ACESSO);

        restLogAcessoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLogAcesso.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLogAcesso))
            )
            .andExpect(status().isOk());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeUpdate);
        LogAcesso testLogAcesso = logAcessoList.get(logAcessoList.size() - 1);
        assertThat(testLogAcesso.getCodigoRfid()).isEqualTo(UPDATED_CODIGO_RFID);
        assertThat(testLogAcesso.getDataAcesso()).isEqualTo(UPDATED_DATA_ACESSO);
    }

    @Test
    @Transactional
    void fullUpdateLogAcessoWithPatch() throws Exception {
        // Initialize the database
        logAcessoRepository.saveAndFlush(logAcesso);

        int databaseSizeBeforeUpdate = logAcessoRepository.findAll().size();

        // Update the logAcesso using partial update
        LogAcesso partialUpdatedLogAcesso = new LogAcesso();
        partialUpdatedLogAcesso.setId(logAcesso.getId());

        partialUpdatedLogAcesso.codigoRfid(UPDATED_CODIGO_RFID).dataAcesso(UPDATED_DATA_ACESSO);

        restLogAcessoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLogAcesso.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLogAcesso))
            )
            .andExpect(status().isOk());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeUpdate);
        LogAcesso testLogAcesso = logAcessoList.get(logAcessoList.size() - 1);
        assertThat(testLogAcesso.getCodigoRfid()).isEqualTo(UPDATED_CODIGO_RFID);
        assertThat(testLogAcesso.getDataAcesso()).isEqualTo(UPDATED_DATA_ACESSO);
    }

    @Test
    @Transactional
    void patchNonExistingLogAcesso() throws Exception {
        int databaseSizeBeforeUpdate = logAcessoRepository.findAll().size();
        logAcesso.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLogAcessoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, logAcesso.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(logAcesso))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLogAcesso() throws Exception {
        int databaseSizeBeforeUpdate = logAcessoRepository.findAll().size();
        logAcesso.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogAcessoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(logAcesso))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLogAcesso() throws Exception {
        int databaseSizeBeforeUpdate = logAcessoRepository.findAll().size();
        logAcesso.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogAcessoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(logAcesso))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LogAcesso in the database
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLogAcesso() throws Exception {
        // Initialize the database
        logAcessoRepository.saveAndFlush(logAcesso);

        int databaseSizeBeforeDelete = logAcessoRepository.findAll().size();

        // Delete the logAcesso
        restLogAcessoMockMvc
            .perform(delete(ENTITY_API_URL_ID, logAcesso.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LogAcesso> logAcessoList = logAcessoRepository.findAll();
        assertThat(logAcessoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

package br.univesp.domain;

import static br.univesp.domain.LogAcessoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.univesp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LogAcessoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LogAcesso.class);
        LogAcesso logAcesso1 = getLogAcessoSample1();
        LogAcesso logAcesso2 = new LogAcesso();
        assertThat(logAcesso1).isNotEqualTo(logAcesso2);

        logAcesso2.setId(logAcesso1.getId());
        assertThat(logAcesso1).isEqualTo(logAcesso2);

        logAcesso2 = getLogAcessoSample2();
        assertThat(logAcesso1).isNotEqualTo(logAcesso2);
    }
}

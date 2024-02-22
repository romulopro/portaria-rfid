package br.univesp.domain;

import static br.univesp.domain.UsuariosRegistradosTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.univesp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UsuariosRegistradosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsuariosRegistrados.class);
        UsuariosRegistrados usuariosRegistrados1 = getUsuariosRegistradosSample1();
        UsuariosRegistrados usuariosRegistrados2 = new UsuariosRegistrados();
        assertThat(usuariosRegistrados1).isNotEqualTo(usuariosRegistrados2);

        usuariosRegistrados2.setId(usuariosRegistrados1.getId());
        assertThat(usuariosRegistrados1).isEqualTo(usuariosRegistrados2);

        usuariosRegistrados2 = getUsuariosRegistradosSample2();
        assertThat(usuariosRegistrados1).isNotEqualTo(usuariosRegistrados2);
    }
}

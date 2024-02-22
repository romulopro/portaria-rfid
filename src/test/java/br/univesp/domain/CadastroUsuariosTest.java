package br.univesp.domain;

import static br.univesp.domain.CadastroUsuariosTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.univesp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CadastroUsuariosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CadastroUsuarios.class);
        CadastroUsuarios cadastroUsuarios1 = getCadastroUsuariosSample1();
        CadastroUsuarios cadastroUsuarios2 = new CadastroUsuarios();
        assertThat(cadastroUsuarios1).isNotEqualTo(cadastroUsuarios2);

        cadastroUsuarios2.setId(cadastroUsuarios1.getId());
        assertThat(cadastroUsuarios1).isEqualTo(cadastroUsuarios2);

        cadastroUsuarios2 = getCadastroUsuariosSample2();
        assertThat(cadastroUsuarios1).isNotEqualTo(cadastroUsuarios2);
    }
}

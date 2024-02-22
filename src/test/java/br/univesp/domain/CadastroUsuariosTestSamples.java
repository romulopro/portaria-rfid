package br.univesp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CadastroUsuariosTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CadastroUsuarios getCadastroUsuariosSample1() {
        return new CadastroUsuarios().id(1L).codigoRfid("codigoRfid1");
    }

    public static CadastroUsuarios getCadastroUsuariosSample2() {
        return new CadastroUsuarios().id(2L).codigoRfid("codigoRfid2");
    }

    public static CadastroUsuarios getCadastroUsuariosRandomSampleGenerator() {
        return new CadastroUsuarios().id(longCount.incrementAndGet()).codigoRfid(UUID.randomUUID().toString());
    }
}

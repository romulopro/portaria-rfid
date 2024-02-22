package br.univesp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class UsuariosRegistradosTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static UsuariosRegistrados getUsuariosRegistradosSample1() {
        return new UsuariosRegistrados().id(1L).nome("nome1").codigoRfid("codigoRfid1");
    }

    public static UsuariosRegistrados getUsuariosRegistradosSample2() {
        return new UsuariosRegistrados().id(2L).nome("nome2").codigoRfid("codigoRfid2");
    }

    public static UsuariosRegistrados getUsuariosRegistradosRandomSampleGenerator() {
        return new UsuariosRegistrados()
            .id(longCount.incrementAndGet())
            .nome(UUID.randomUUID().toString())
            .codigoRfid(UUID.randomUUID().toString());
    }
}

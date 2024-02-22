package br.univesp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class LogAcessoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static LogAcesso getLogAcessoSample1() {
        return new LogAcesso().id(1L).codigoRfid("codigoRfid1");
    }

    public static LogAcesso getLogAcessoSample2() {
        return new LogAcesso().id(2L).codigoRfid("codigoRfid2");
    }

    public static LogAcesso getLogAcessoRandomSampleGenerator() {
        return new LogAcesso().id(longCount.incrementAndGet()).codigoRfid(UUID.randomUUID().toString());
    }
}

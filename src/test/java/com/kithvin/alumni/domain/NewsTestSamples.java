package com.kithvin.alumni.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class NewsTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static News getNewsSample1() {
        return new News().id(1L).authorName("authorName1").title("title1").group("group1");
    }

    public static News getNewsSample2() {
        return new News().id(2L).authorName("authorName2").title("title2").group("group2");
    }

    public static News getNewsRandomSampleGenerator() {
        return new News()
            .id(longCount.incrementAndGet())
            .authorName(UUID.randomUUID().toString())
            .title(UUID.randomUUID().toString())
            .group(UUID.randomUUID().toString());
    }
}

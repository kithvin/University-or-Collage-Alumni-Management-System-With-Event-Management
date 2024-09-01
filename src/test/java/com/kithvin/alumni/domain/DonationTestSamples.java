package com.kithvin.alumni.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class DonationTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Donation getDonationSample1() {
        return new Donation()
            .id(1L)
            .donationName("donationName1")
            .contactDetails("contactDetails1")
            .billingAddress("billingAddress1")
            .description("description1")
            .donationType("donationType1");
    }

    public static Donation getDonationSample2() {
        return new Donation()
            .id(2L)
            .donationName("donationName2")
            .contactDetails("contactDetails2")
            .billingAddress("billingAddress2")
            .description("description2")
            .donationType("donationType2");
    }

    public static Donation getDonationRandomSampleGenerator() {
        return new Donation()
            .id(longCount.incrementAndGet())
            .donationName(UUID.randomUUID().toString())
            .contactDetails(UUID.randomUUID().toString())
            .billingAddress(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .donationType(UUID.randomUUID().toString());
    }
}

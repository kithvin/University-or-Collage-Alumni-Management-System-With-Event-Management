package com.kithvin.alumni.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class NewsAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertNewsAllPropertiesEquals(News expected, News actual) {
        assertNewsAutoGeneratedPropertiesEquals(expected, actual);
        assertNewsAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertNewsAllUpdatablePropertiesEquals(News expected, News actual) {
        assertNewsUpdatableFieldsEquals(expected, actual);
        assertNewsUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertNewsAutoGeneratedPropertiesEquals(News expected, News actual) {
        assertThat(expected)
            .as("Verify News auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertNewsUpdatableFieldsEquals(News expected, News actual) {
        assertThat(expected)
            .as("Verify News relevant properties")
            .satisfies(e -> assertThat(e.getAuthorName()).as("check authorName").isEqualTo(actual.getAuthorName()))
            .satisfies(e -> assertThat(e.getTitle()).as("check title").isEqualTo(actual.getTitle()))
            .satisfies(e -> assertThat(e.getPublishDate()).as("check publishDate").isEqualTo(actual.getPublishDate()))
            .satisfies(e -> assertThat(e.getCoverArea()).as("check coverArea").isEqualTo(actual.getCoverArea()))
            .satisfies(e -> assertThat(e.getGroup()).as("check group").isEqualTo(actual.getGroup()))
            .satisfies(e -> assertThat(e.getExpireDate()).as("check expireDate").isEqualTo(actual.getExpireDate()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertNewsUpdatableRelationshipsEquals(News expected, News actual) {}
}

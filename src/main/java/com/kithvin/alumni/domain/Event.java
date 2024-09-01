package com.kithvin.alumni.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "date_and_time")
    private Instant dateAndTime;

    @Column(name = "location")
    private String location;

    @Column(name = "event_type")
    private String eventType;

    @Column(name = "description")
    private String description;

    @Column(name = "target_audience")
    private String targetAudience;

    @Column(name = "event_coordinator")
    private String eventCoordinator;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Event id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventName() {
        return this.eventName;
    }

    public Event eventName(String eventName) {
        this.setEventName(eventName);
        return this;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Instant getDateAndTime() {
        return this.dateAndTime;
    }

    public Event dateAndTime(Instant dateAndTime) {
        this.setDateAndTime(dateAndTime);
        return this;
    }

    public void setDateAndTime(Instant dateAndTime) {
        this.dateAndTime = dateAndTime;
    }

    public String getLocation() {
        return this.location;
    }

    public Event location(String location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEventType() {
        return this.eventType;
    }

    public Event eventType(String eventType) {
        this.setEventType(eventType);
        return this;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getDescription() {
        return this.description;
    }

    public Event description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTargetAudience() {
        return this.targetAudience;
    }

    public Event targetAudience(String targetAudience) {
        this.setTargetAudience(targetAudience);
        return this;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

    public String getEventCoordinator() {
        return this.eventCoordinator;
    }

    public Event eventCoordinator(String eventCoordinator) {
        this.setEventCoordinator(eventCoordinator);
        return this;
    }

    public void setEventCoordinator(String eventCoordinator) {
        this.eventCoordinator = eventCoordinator;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Event)) {
            return false;
        }
        return getId() != null && getId().equals(((Event) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", eventName='" + getEventName() + "'" +
            ", dateAndTime='" + getDateAndTime() + "'" +
            ", location='" + getLocation() + "'" +
            ", eventType='" + getEventType() + "'" +
            ", description='" + getDescription() + "'" +
            ", targetAudience='" + getTargetAudience() + "'" +
            ", eventCoordinator='" + getEventCoordinator() + "'" +
            "}";
    }
}

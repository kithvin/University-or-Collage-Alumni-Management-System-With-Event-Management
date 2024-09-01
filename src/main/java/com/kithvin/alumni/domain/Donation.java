package com.kithvin.alumni.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Donation.
 */
@Entity
@Table(name = "donation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Donation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "donation_name")
    private String donationName;

    @Column(name = "contact_details")
    private String contactDetails;

    @Column(name = "billing_address")
    private String billingAddress;

    @Column(name = "amount")
    private Instant amount;

    @Column(name = "description")
    private String description;

    @Column(name = "donation_type")
    private String donationType;

    @Column(name = "date_and_time")
    private Instant dateAndTime;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Donation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDonationName() {
        return this.donationName;
    }

    public Donation donationName(String donationName) {
        this.setDonationName(donationName);
        return this;
    }

    public void setDonationName(String donationName) {
        this.donationName = donationName;
    }

    public String getContactDetails() {
        return this.contactDetails;
    }

    public Donation contactDetails(String contactDetails) {
        this.setContactDetails(contactDetails);
        return this;
    }

    public void setContactDetails(String contactDetails) {
        this.contactDetails = contactDetails;
    }

    public String getBillingAddress() {
        return this.billingAddress;
    }

    public Donation billingAddress(String billingAddress) {
        this.setBillingAddress(billingAddress);
        return this;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Instant getAmount() {
        return this.amount;
    }

    public Donation amount(Instant amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Instant amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return this.description;
    }

    public Donation description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDonationType() {
        return this.donationType;
    }

    public Donation donationType(String donationType) {
        this.setDonationType(donationType);
        return this;
    }

    public void setDonationType(String donationType) {
        this.donationType = donationType;
    }

    public Instant getDateAndTime() {
        return this.dateAndTime;
    }

    public Donation dateAndTime(Instant dateAndTime) {
        this.setDateAndTime(dateAndTime);
        return this;
    }

    public void setDateAndTime(Instant dateAndTime) {
        this.dateAndTime = dateAndTime;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Donation)) {
            return false;
        }
        return getId() != null && getId().equals(((Donation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Donation{" +
            "id=" + getId() +
            ", donationName='" + getDonationName() + "'" +
            ", contactDetails='" + getContactDetails() + "'" +
            ", billingAddress='" + getBillingAddress() + "'" +
            ", amount='" + getAmount() + "'" +
            ", description='" + getDescription() + "'" +
            ", donationType='" + getDonationType() + "'" +
            ", dateAndTime='" + getDateAndTime() + "'" +
            "}";
    }
}

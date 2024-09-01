import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDonation } from 'app/shared/model/donation.model';
import { getEntity, updateEntity, createEntity, reset } from './donation.reducer';

export const DonationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const donationEntity = useAppSelector(state => state.donation.entity);
  const loading = useAppSelector(state => state.donation.loading);
  const updating = useAppSelector(state => state.donation.updating);
  const updateSuccess = useAppSelector(state => state.donation.updateSuccess);

  const handleClose = () => {
    navigate('/donation' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.amount = convertDateTimeToServer(values.amount);
    values.dateAndTime = convertDateTimeToServer(values.dateAndTime);

    const entity = {
      ...donationEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          amount: displayDefaultDateTime(),
          dateAndTime: displayDefaultDateTime(),
        }
      : {
          ...donationEntity,
          amount: convertDateTimeFromServer(donationEntity.amount),
          dateAndTime: convertDateTimeFromServer(donationEntity.dateAndTime),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alumniApp.donation.home.createOrEditLabel" data-cy="DonationCreateUpdateHeading">
            Create or edit a Donation
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="donation-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Donation Name" id="donation-donationName" name="donationName" data-cy="donationName" type="text" />
              <ValidatedField
                label="Contact Details"
                id="donation-contactDetails"
                name="contactDetails"
                data-cy="contactDetails"
                type="text"
              />
              <ValidatedField
                label="Billing Address"
                id="donation-billingAddress"
                name="billingAddress"
                data-cy="billingAddress"
                type="text"
              />
              <ValidatedField
                label="Amount"
                id="donation-amount"
                name="amount"
                data-cy="amount"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Description" id="donation-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="Donation Type" id="donation-donationType" name="donationType" data-cy="donationType" type="text" />
              <ValidatedField
                label="Date And Time"
                id="donation-dateAndTime"
                name="dateAndTime"
                data-cy="dateAndTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/donation" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DonationUpdate;

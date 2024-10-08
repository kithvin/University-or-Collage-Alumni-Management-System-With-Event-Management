import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEvent } from 'app/shared/model/event.model';
import { getEntity, updateEntity, createEntity, reset } from './event.reducer';

export const EventUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const eventEntity = useAppSelector(state => state.event.entity);
  const loading = useAppSelector(state => state.event.loading);
  const updating = useAppSelector(state => state.event.updating);
  const updateSuccess = useAppSelector(state => state.event.updateSuccess);

  const handleClose = () => {
    navigate('/event' + location.search);
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
    values.dateAndTime = convertDateTimeToServer(values.dateAndTime);

    const entity = {
      ...eventEntity,
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
          dateAndTime: displayDefaultDateTime(),
        }
      : {
          ...eventEntity,
          dateAndTime: convertDateTimeFromServer(eventEntity.dateAndTime),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alumniApp.event.home.createOrEditLabel" data-cy="EventCreateUpdateHeading">
            Create or edit a Event
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="event-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Event Name" id="event-eventName" name="eventName" data-cy="eventName" type="text" />
              <ValidatedField
                label="Date And Time"
                id="event-dateAndTime"
                name="dateAndTime"
                data-cy="dateAndTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Location" id="event-location" name="location" data-cy="location" type="text" />
              <ValidatedField label="Event Type" id="event-eventType" name="eventType" data-cy="eventType" type="text" />
              <ValidatedField label="Description" id="event-description" name="description" data-cy="description" type="text" />
              <ValidatedField
                label="Target Audience"
                id="event-targetAudience"
                name="targetAudience"
                data-cy="targetAudience"
                type="text"
              />
              <ValidatedField
                label="Event Coordinator"
                id="event-eventCoordinator"
                name="eventCoordinator"
                data-cy="eventCoordinator"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/event" replace color="info">
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

export default EventUpdate;

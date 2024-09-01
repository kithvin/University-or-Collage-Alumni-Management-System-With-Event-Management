import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IVolunteerOP } from 'app/shared/model/volunteer-op.model';
import { getEntity, updateEntity, createEntity, reset } from './volunteer-op.reducer';

export const VolunteerOPUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const volunteerOPEntity = useAppSelector(state => state.volunteerOP.entity);
  const loading = useAppSelector(state => state.volunteerOP.loading);
  const updating = useAppSelector(state => state.volunteerOP.updating);
  const updateSuccess = useAppSelector(state => state.volunteerOP.updateSuccess);

  const handleClose = () => {
    navigate('/volunteer-op' + location.search);
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
    values.timeDuration = convertDateTimeToServer(values.timeDuration);

    const entity = {
      ...volunteerOPEntity,
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
          timeDuration: displayDefaultDateTime(),
        }
      : {
          ...volunteerOPEntity,
          dateAndTime: convertDateTimeFromServer(volunteerOPEntity.dateAndTime),
          timeDuration: convertDateTimeFromServer(volunteerOPEntity.timeDuration),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alumniApp.volunteerOP.home.createOrEditLabel" data-cy="VolunteerOPCreateUpdateHeading">
            Create or edit a Volunteer OP
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="volunteer-op-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Volunteer Name"
                id="volunteer-op-volunteerName"
                name="volunteerName"
                data-cy="volunteerName"
                type="text"
              />
              <ValidatedField
                label="Date And Time"
                id="volunteer-op-dateAndTime"
                name="dateAndTime"
                data-cy="dateAndTime"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Location" id="volunteer-op-location" name="location" data-cy="location" type="text" />
              <ValidatedField
                label="Time Duration"
                id="volunteer-op-timeDuration"
                name="timeDuration"
                data-cy="timeDuration"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Description" id="volunteer-op-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="Member" id="volunteer-op-member" name="member" data-cy="member" type="text" />
              <ValidatedField
                label="Volunteer Op Coordinator"
                id="volunteer-op-volunteerOpCoordinator"
                name="volunteerOpCoordinator"
                data-cy="volunteerOpCoordinator"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/volunteer-op" replace color="info">
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

export default VolunteerOPUpdate;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IJob } from 'app/shared/model/job.model';
import { getEntity, updateEntity, createEntity, reset } from './job.reducer';

export const JobUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const jobEntity = useAppSelector(state => state.job.entity);
  const loading = useAppSelector(state => state.job.loading);
  const updating = useAppSelector(state => state.job.updating);
  const updateSuccess = useAppSelector(state => state.job.updateSuccess);

  const handleClose = () => {
    navigate('/job' + location.search);
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
    values.salaryDetails = convertDateTimeToServer(values.salaryDetails);
    values.expireDate = convertDateTimeToServer(values.expireDate);

    const entity = {
      ...jobEntity,
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
          salaryDetails: displayDefaultDateTime(),
          expireDate: displayDefaultDateTime(),
        }
      : {
          ...jobEntity,
          salaryDetails: convertDateTimeFromServer(jobEntity.salaryDetails),
          expireDate: convertDateTimeFromServer(jobEntity.expireDate),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alumniApp.job.home.createOrEditLabel" data-cy="JobCreateUpdateHeading">
            Create or edit a Job
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="job-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Job Name" id="job-jobName" name="jobName" data-cy="jobName" type="text" />
              <ValidatedField label="Company Name" id="job-companyName" name="companyName" data-cy="companyName" type="text" />
              <ValidatedField label="Location" id="job-location" name="location" data-cy="location" type="text" />
              <ValidatedField
                label="Salary Details"
                id="job-salaryDetails"
                name="salaryDetails"
                data-cy="salaryDetails"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Job Description" id="job-jobDescription" name="jobDescription" data-cy="jobDescription" type="text" />
              <ValidatedField
                label="Expire Date"
                id="job-expireDate"
                name="expireDate"
                data-cy="expireDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Job Apply Method" id="job-jobApplyMethod" name="jobApplyMethod" data-cy="jobApplyMethod" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/job" replace color="info">
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

export default JobUpdate;

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './job.reducer';

export const JobDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const jobEntity = useAppSelector(state => state.job.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="jobDetailsHeading">Job</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{jobEntity.id}</dd>
          <dt>
            <span id="jobName">Job Name</span>
          </dt>
          <dd>{jobEntity.jobName}</dd>
          <dt>
            <span id="companyName">Company Name</span>
          </dt>
          <dd>{jobEntity.companyName}</dd>
          <dt>
            <span id="location">Location</span>
          </dt>
          <dd>{jobEntity.location}</dd>
          <dt>
            <span id="salaryDetails">Salary Details</span>
          </dt>
          <dd>{jobEntity.salaryDetails ? <TextFormat value={jobEntity.salaryDetails} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="jobDescription">Job Description</span>
          </dt>
          <dd>{jobEntity.jobDescription}</dd>
          <dt>
            <span id="expireDate">Expire Date</span>
          </dt>
          <dd>{jobEntity.expireDate ? <TextFormat value={jobEntity.expireDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="jobApplyMethod">Job Apply Method</span>
          </dt>
          <dd>{jobEntity.jobApplyMethod}</dd>
        </dl>
        <Button tag={Link} to="/job" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/job/${jobEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default JobDetail;

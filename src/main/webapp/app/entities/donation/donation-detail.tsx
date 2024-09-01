import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './donation.reducer';

export const DonationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const donationEntity = useAppSelector(state => state.donation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="donationDetailsHeading">Donation</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{donationEntity.id}</dd>
          <dt>
            <span id="donationName">Donation Name</span>
          </dt>
          <dd>{donationEntity.donationName}</dd>
          <dt>
            <span id="contactDetails">Contact Details</span>
          </dt>
          <dd>{donationEntity.contactDetails}</dd>
          <dt>
            <span id="billingAddress">Billing Address</span>
          </dt>
          <dd>{donationEntity.billingAddress}</dd>
          <dt>
            <span id="amount">Amount</span>
          </dt>
          <dd>{donationEntity.amount ? <TextFormat value={donationEntity.amount} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{donationEntity.description}</dd>
          <dt>
            <span id="donationType">Donation Type</span>
          </dt>
          <dd>{donationEntity.donationType}</dd>
          <dt>
            <span id="dateAndTime">Date And Time</span>
          </dt>
          <dd>
            {donationEntity.dateAndTime ? <TextFormat value={donationEntity.dateAndTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/donation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/donation/${donationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DonationDetail;

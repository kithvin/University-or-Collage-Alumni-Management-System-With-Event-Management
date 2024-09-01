import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './event.reducer';

export const EventDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const eventEntity = useAppSelector(state => state.event.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="eventDetailsHeading">Event</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{eventEntity.id}</dd>
          <dt>
            <span id="eventName">Event Name</span>
          </dt>
          <dd>{eventEntity.eventName}</dd>
          <dt>
            <span id="dateAndTime">Date And Time</span>
          </dt>
          <dd>{eventEntity.dateAndTime ? <TextFormat value={eventEntity.dateAndTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="location">Location</span>
          </dt>
          <dd>{eventEntity.location}</dd>
          <dt>
            <span id="eventType">Event Type</span>
          </dt>
          <dd>{eventEntity.eventType}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{eventEntity.description}</dd>
          <dt>
            <span id="targetAudience">Target Audience</span>
          </dt>
          <dd>{eventEntity.targetAudience}</dd>
          <dt>
            <span id="eventCoordinator">Event Coordinator</span>
          </dt>
          <dd>{eventEntity.eventCoordinator}</dd>
        </dl>
        <Button tag={Link} to="/event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event/${eventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EventDetail;

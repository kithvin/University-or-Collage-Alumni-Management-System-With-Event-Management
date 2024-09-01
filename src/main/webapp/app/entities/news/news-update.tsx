import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { INews } from 'app/shared/model/news.model';
import { getEntity, updateEntity, createEntity, reset } from './news.reducer';

export const NewsUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const newsEntity = useAppSelector(state => state.news.entity);
  const loading = useAppSelector(state => state.news.loading);
  const updating = useAppSelector(state => state.news.updating);
  const updateSuccess = useAppSelector(state => state.news.updateSuccess);

  const handleClose = () => {
    navigate('/news' + location.search);
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
    values.publishDate = convertDateTimeToServer(values.publishDate);
    values.coverArea = convertDateTimeToServer(values.coverArea);
    values.expireDate = convertDateTimeToServer(values.expireDate);

    const entity = {
      ...newsEntity,
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
          publishDate: displayDefaultDateTime(),
          coverArea: displayDefaultDateTime(),
          expireDate: displayDefaultDateTime(),
        }
      : {
          ...newsEntity,
          publishDate: convertDateTimeFromServer(newsEntity.publishDate),
          coverArea: convertDateTimeFromServer(newsEntity.coverArea),
          expireDate: convertDateTimeFromServer(newsEntity.expireDate),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alumniApp.news.home.createOrEditLabel" data-cy="NewsCreateUpdateHeading">
            Create or edit a News
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="news-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Author Name" id="news-authorName" name="authorName" data-cy="authorName" type="text" />
              <ValidatedField label="Title" id="news-title" name="title" data-cy="title" type="text" />
              <ValidatedField
                label="Publish Date"
                id="news-publishDate"
                name="publishDate"
                data-cy="publishDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Cover Area"
                id="news-coverArea"
                name="coverArea"
                data-cy="coverArea"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Group" id="news-group" name="group" data-cy="group" type="text" />
              <ValidatedField
                label="Expire Date"
                id="news-expireDate"
                name="expireDate"
                data-cy="expireDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/news" replace color="info">
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

export default NewsUpdate;

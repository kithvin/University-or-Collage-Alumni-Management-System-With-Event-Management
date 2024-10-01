import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaBriefcase } from 'react-icons/fa';

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
      <div className="bg-cover bg-center min-h-screen flex flex-col" style={{ backgroundImage: 'url(/content/images/alu9.jpg)' }}>
        {/* Navbar with centered title */}
        <nav className="bg-gray-800 bg-opacity-100 p-4 flex justify-center items-center">
          <div className="text-white text-2xl font-bold flex items-center">
            <FaBriefcase className="mr-2" /> {/* Briefcase icon */}
            Alumni Job Board Create or edit a Job {/* Centered title */}
          </div>
        </nav>

        {/* Main container for the form */}
        <div className="flex-grow container max-w-lg mx-auto p-2">
          <h2 className="text-center text-3xl font-bold mb-4 text-white"> Post a Job</h2> {/* Page title */}
          {/* Form container with a background color and shadow */}
          <div className="bg-amber-100 shadow-md rounded-lg p-6">
            <form onSubmit={saveEntity}>
              {/* Job Name input field */}
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="jobName">
                  Job Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="jobName"
                  type="text"
                  placeholder="Enter job name"
                />
              </div>

              {/* Company Name input field */}
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="companyName">
                  Company Name
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="companyName"
                  type="text"
                  placeholder="Enter company name"
                />
              </div>

              {/* Location input field */}
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="location">
                  Location
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="location"
                  type="text"
                  placeholder="Enter job location"
                />
              </div>

              {/* Salary Details input field */}
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="salaryDetails">
                  Salary Details
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="salaryDetails"
                  type="text"
                  placeholder="Enter salary details"
                />
              </div>

              <div className="mb-3">
                <ValidatedField
                  label="Job Description"
                  id="job-jobDescription"
                  name="jobDescription"
                  data-cy="jobDescription"
                  type="text"
                />
              </div>

              {/* Expire Date input field */}
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="expireDate">
                  Expire Date
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="expireDate"
                  type="date"
                />
              </div>

              {/* Job Apply Method combo box */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="applyMethod">
                  Job Apply Method
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" id="applyMethod">
                  <option value="">Select Apply Method</option>
                  <option value="Email">Email</option>
                  <option value="Phonecalls">Phonecalls</option>
                  <option value="DirectContact">Direct Contact</option>
                </select>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Post Job
              </button>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/job" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>

    //       <Row className="justify-content-center">
    //         <Col md="8">
    //           {loading ? (
    //             <p>Loading...</p>
    //           ) : (
    //             <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
    //               {!isNew ? <ValidatedField name="id" required readOnly id="job-id" label="ID" validate={{ required: true }} /> : null}
    //               <ValidatedField label="Job Name" id="job-jobName" name="jobName" data-cy="jobName" type="text" />
    //               <ValidatedField label="Company Name" id="job-companyName" name="companyName" data-cy="companyName" type="text" />
    //               <ValidatedField label="Location" id="job-location" name="location" data-cy="location" type="text" />
    //               <ValidatedField
    //                 label="Salary Details"
    //                 id="job-salaryDetails"
    //                 name="salaryDetails"
    //                 data-cy="salaryDetails"
    //                 type="datetime-local"
    //                 placeholder="YYYY-MM-DD HH:mm"
    //               />
    //               <ValidatedField label="Job Description" id="job-jobDescription" name="jobDescription" data-cy="jobDescription" type="text" />
    //               <ValidatedField
    //                 label="Expire Date"
    //                 id="job-expireDate"
    //                 name="expireDate"
    //                 data-cy="expireDate"
    //                 type="datetime-local"
    //                 placeholder="YYYY-MM-DD HH:mm"
    //               />
    //               <ValidatedField label="Job Apply Method" id="job-jobApplyMethod" name="jobApplyMethod" data-cy="jobApplyMethod" type="text" />
    //               <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/job" replace color="info">
    //                 <FontAwesomeIcon icon="arrow-left" />
    //                 &nbsp;
    //                 <span className="d-none d-md-inline">Back</span>
    //               </Button>
    //               &nbsp;
    //               <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
    //                 <FontAwesomeIcon icon="save" />
    //                 &nbsp; Save
    //               </Button>
    //             </ValidatedForm>
    //           )}
    //         </Col>
    //       </Row>
  );
};

export default JobUpdate;

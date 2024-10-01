import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './job.reducer';

export const Job = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const jobList = useAppSelector(state => state.job.entities);
  const loading = useAppSelector(state => state.job.loading);
  const totalItems = useAppSelector(state => state.job.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="job-heading" data-cy="JobHeading">
        Jobs
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/job/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Job
          </Link>
        </div>
      </h2>

      <div className="container mx-auto mt-5">
        <h1 className="text-center text-3xl font-bold mb-5 mt-12 text-fuchsia-500">List of Jobs</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-purple-50 text-black">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4" onClick={sort('jobName')}>
                Job Name <FontAwesomeIcon icon={getSortIconByFieldName('jobName')} />
              </th>
              <th className="py-3 px-4" onClick={sort('companyName')}>
                Company Name <FontAwesomeIcon icon={getSortIconByFieldName('companyName')} />
              </th>
              <th className="py-3 px-4" onClick={sort('location')}>
                Location <FontAwesomeIcon icon={getSortIconByFieldName('location')} />
              </th>
              <th className="py-3 px-4" onClick={sort('salaryDetails')}>
                Salary Details <FontAwesomeIcon icon={getSortIconByFieldName('salaryDetails')} />
              </th>
              <th className="py-3 px-4">Job Description</th>
              <th className="py-3 px-4" onClick={sort('expireDate')}>
                Expire Date <FontAwesomeIcon icon={getSortIconByFieldName('expireDate')} />
              </th>
              <th className="py-3 px-4">Job Apply Method</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobList.map((job, i) => (
              <tr key={job.id} className="even:bg-gray-100">
                <td>
                  <Button tag={Link} to={`/job/${job.id}`} color="link" size="sm">
                    {job.id}
                  </Button>
                </td>
                <td className="py-3 px-4 text-center">{job.jobName}</td>
                <td className="py-3 px-4 text-center">{job.companyName}</td>
                <td className="py-3 px-4 text-center">{job.location}</td>
                <td className="py-3 px-4 text-center">{job.salaryDetails}</td>
                <td className="py-3 px-4 text-center">{job.jobDescription}</td>
                <td className="py-3 px-4 text-center">{job.expireDate}</td>
                <td className="py-3 px-4 text-center">{job.jobApplyMethod}</td>
                <td className="py-3 px-4 text-center space-x-2">
                  <Link
                    to={`/editjob/${job.id}`}
                    className="border border-blue-500 text-blue-500 py-1 px-3 rounded hover:bg-blue-500 hover:text-white"
                  >
                    Edit
                  </Link>
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 ml-4">Email</button>
                  <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 ml-4">Notification</button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-4 mt-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    //
    //     <div className="container mx-auto mt-5">
    //             <h1 className="text-center text-3xl font-bold mb-5 mt-12 text-fuchsia-500">List of Jobs</h1>
    //             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
    //               <thead className="bg-purple-50 text-black">
    //                 <tr>
    //                   <th className="py-3 px-4">#</th>
    //                   <th className="py-3 px-4">Job Name</th>
    //                   <th className="py-3 px-4">Company Name</th>
    //                   <th className="py-3 px-4">Location</th>
    //                   <th className="py-3 px-4">Salary Details</th>
    //                   <th className="py-3 px-4">Job Description</th>
    //                   <th className="py-3 px-4">Expire Date</th>
    //                   <th className="py-3 px-4">Job Apply Method</th>
    //                   <th className="py-3 px-4">Action</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {jobList.map((job, i) => (
    //                   <tr key={i} className="even:bg-gray-100">
    //                     <td className="py-3 px-4 text-center">{index + 1}</td>
    //                     <td className="py-3 px-4 text-center">{job.jobName}</td>
    //                     <td className="py-3 px-4 text-center">{job.companyName}</td>
    //                     <td className="py-3 px-4 text-center">{job.location}</td>
    //                     <td className="py-3 px-4 text-center">{job.salaryDetails}</td>
    //                     <td className="py-3 px-4 text-center">{job.jobDescription}</td>
    //                     <td className="py-3 px-4 text-center">{job.expireDate}</td>
    //                     <td className="py-3 px-4 text-center">{job.jobApplyMethod}</td>
    //                     <td className="py-3 px-4 text-center space-x-2">
    //                       <Link
    //                         to={`/editjob/${job.id}`}
    //                         className="border border-blue-500 text-blue-500 py-1 px-3 rounded hover:bg-blue-500 hover:text-white"
    //                       >
    //                         Edit
    //                       </Link>
    //                       <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 ml-4">Email</button>
    //                       <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 ml-4">Notification</button>
    //                       <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-4 mt-2">Delete</button>
    //                     </td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           </div>

    //     <div>
    //       <h2 id="job-heading" data-cy="JobHeading">
    //         Jobs
    //         <div className="d-flex justify-content-end">
    //           <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
    //             <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
    //           </Button>
    //           <Link to="/job/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
    //             <FontAwesomeIcon icon="plus" />
    //             &nbsp; Create a new Job
    //           </Link>
    //         </div>
    //       </h2>
    //       <div className="table-responsive">
    //         {jobList && jobList.length > 0 ? (
    //           <Table responsive>
    //             <thead>
    //               <tr>
    //                 <th className="hand" onClick={sort('id')}>
    //                   ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('jobName')}>
    //                   Job Name <FontAwesomeIcon icon={getSortIconByFieldName('jobName')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('companyName')}>
    //                   Company Name <FontAwesomeIcon icon={getSortIconByFieldName('companyName')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('location')}>
    //                   Location <FontAwesomeIcon icon={getSortIconByFieldName('location')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('salaryDetails')}>
    //                   Salary Details <FontAwesomeIcon icon={getSortIconByFieldName('salaryDetails')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('jobDescription')}>
    //                   Job Description <FontAwesomeIcon icon={getSortIconByFieldName('jobDescription')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('expireDate')}>
    //                   Expire Date <FontAwesomeIcon icon={getSortIconByFieldName('expireDate')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('jobApplyMethod')}>
    //                   Job Apply Method <FontAwesomeIcon icon={getSortIconByFieldName('jobApplyMethod')} />
    //                 </th>
    //                 <th />
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {jobList.map((job, i) => (
    //                 <tr key={`entity-${i}`} data-cy="entityTable">
    //                   <td>
    //                     <Button tag={Link} to={`/job/${job.id}`} color="link" size="sm">
    //                       {job.id}
    //                     </Button>
    //                   </td>
    //                   <td>{job.jobName}</td>
    //                   <td>{job.companyName}</td>
    //                   <td>{job.location}</td>
    //                   <td>{job.salaryDetails ? <TextFormat type="date" value={job.salaryDetails} format={APP_DATE_FORMAT} /> : null}</td>
    //                   <td>{job.jobDescription}</td>
    //                   <td>{job.expireDate ? <TextFormat type="date" value={job.expireDate} format={APP_DATE_FORMAT} /> : null}</td>
    //                   <td>{job.jobApplyMethod}</td>
    //                   <td className="text-end">
    //                     <div className="btn-group flex-btn-group-container">
    //                       <Button tag={Link} to={`/job/${job.id}`} color="info" size="sm" data-cy="entityDetailsButton">
    //                         <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
    //                       </Button>
    //                       <Button
    //                         tag={Link}
    //                         to={`/job/${job.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
    //                         color="primary"
    //                         size="sm"
    //                         data-cy="entityEditButton"
    //                       >
    //                         <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
    //                       </Button>
    //                       <Button
    //                         onClick={() =>
    //                           (window.location.href = `/job/${job.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
    //                         }
    //                         color="danger"
    //                         size="sm"
    //                         data-cy="entityDeleteButton"
    //                       >
    //                         <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
    //                       </Button>
    //                     </div>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </Table>
    //         ) : (
    //           !loading && <div className="alert alert-warning">No Jobs found</div>
    //         )}
    //       </div>
    //       {totalItems ? (
    //         <div className={jobList && jobList.length > 0 ? '' : 'd-none'}>
    //           <div className="justify-content-center d-flex">
    //             <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
    //           </div>
    //           <div className="justify-content-center d-flex">
    //             <JhiPagination
    //               activePage={paginationState.activePage}
    //               onSelect={handlePagination}
    //               maxButtons={5}
    //               itemsPerPage={paginationState.itemsPerPage}
    //               totalItems={totalItems}
    //             />
    //           </div>
    //         </div>
    //       ) : (
    //         ''
    //       )}
    //     </div>
  );
};

export default Job;

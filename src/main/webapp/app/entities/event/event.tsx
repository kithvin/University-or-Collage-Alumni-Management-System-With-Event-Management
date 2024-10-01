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

import { getEntities } from './event.reducer';

export const Event = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const eventList = useAppSelector(state => state.event.entities);
  const loading = useAppSelector(state => state.event.loading);
  const totalItems = useAppSelector(state => state.event.totalItems);

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
      <h2 id="event-heading" data-cy="EventHeading">
        Events
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/event/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Event
          </Link>
        </div>
      </h2>
      <div className="container mx-auto mt-5">
        <h1 className="text-center text-3xl font-bold mb-5 mt-12 text-red-600">List of Event</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-purple-50 text-black">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Event Name</th>
              <th className="py-3 px-4">Date and Time</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Target Audience</th>
              <th className="py-3 px-4">Event Coordinator</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {eventList.map((event, i) => (
              <tr key={i} className="even:bg-gray-100">
                <td className="py-3 px-4 text-center">{i + 1}</td>
                <td className="py-3 px-4 text-center">{event.eventName}</td>
                <td className="py-3 px-4 text-center">{event.dateAndTime}</td>
                <td className="py-3 px-4 text-center">{event.location}</td>
                <td className="py-3 px-4 text-center">{event.description}</td>
                <td className="py-3 px-4 text-center">{event.targetaudince}</td>
                <td className="py-3 px-4 text-center">{event.eventcoordinator}</td>
                <td className="py-3 px-4 text-center space-x-2">
                  {/* Buttons for accepting or rejecting events */}
                  <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ml-4 mt-2 w-auto">Accepted</button>
                  <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 ml-4 mt-2 w-auto">Rejected</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    //     <div>
    //       <h2 id="event-heading" data-cy="EventHeading">
    //         Events
    //         <div className="d-flex justify-content-end">
    //           <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
    //             <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
    //           </Button>
    //           <Link to="/event/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
    //             <FontAwesomeIcon icon="plus" />
    //             &nbsp; Create a new Event
    //           </Link>
    //         </div>
    //       </h2>
    //       <div className="table-responsive">
    //         {eventList && eventList.length > 0 ? (
    //           <Table responsive>
    //             <thead>
    //               <tr>
    //                 <th className="hand" onClick={sort('id')}>
    //                   ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('eventName')}>
    //                   Event Name <FontAwesomeIcon icon={getSortIconByFieldName('eventName')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('dateAndTime')}>
    //                   Date And Time <FontAwesomeIcon icon={getSortIconByFieldName('dateAndTime')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('location')}>
    //                   Location <FontAwesomeIcon icon={getSortIconByFieldName('location')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('eventType')}>
    //                   Event Type <FontAwesomeIcon icon={getSortIconByFieldName('eventType')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('description')}>
    //                   Description <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('targetAudience')}>
    //                   Target Audience <FontAwesomeIcon icon={getSortIconByFieldName('targetAudience')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('eventCoordinator')}>
    //                   Event Coordinator <FontAwesomeIcon icon={getSortIconByFieldName('eventCoordinator')} />
    //                 </th>
    //                 <th />
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {eventList.map((event, i) => (
    //                 <tr key={`entity-${i}`} data-cy="entityTable">
    //                   <td>
    //                     <Button tag={Link} to={`/event/${event.id}`} color="link" size="sm">
    //                       {event.id}
    //                     </Button>
    //                   </td>
    //                   <td>{event.eventName}</td>
    //                   <td>{event.dateAndTime ? <TextFormat type="date" value={event.dateAndTime} format={APP_DATE_FORMAT} /> : null}</td>
    //                   <td>{event.location}</td>
    //                   <td>{event.eventType}</td>
    //                   <td>{event.description}</td>
    //                   <td>{event.targetAudience}</td>
    //                   <td>{event.eventCoordinator}</td>
    //                   <td className="text-end">
    //                     <div className="btn-group flex-btn-group-container">
    //                       <Button tag={Link} to={`/event/${event.id}`} color="info" size="sm" data-cy="entityDetailsButton">
    //                         <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
    //                       </Button>
    //                       <Button
    //                         tag={Link}
    //                         to={`/event/${event.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
    //                         color="primary"
    //                         size="sm"
    //                         data-cy="entityEditButton"
    //                       >
    //                         <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
    //                       </Button>
    //                       <Button
    //                         onClick={() =>
    //                           (window.location.href = `/event/${event.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
    //           !loading && <div className="alert alert-warning">No Events found</div>
    //         )}
    //       </div>
    //       {totalItems ? (
    //         <div className={eventList && eventList.length > 0 ? '' : 'd-none'}>
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

export default Event;

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

import { getEntities } from './donation.reducer';

export const Donation = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const donationList = useAppSelector(state => state.donation.entities);
  const loading = useAppSelector(state => state.donation.loading);
  const totalItems = useAppSelector(state => state.donation.totalItems);

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
      <h2 id="donation-heading" data-cy="DonationHeading">
        Donations
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/donation/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Donation
          </Link>
        </div>
      </h2>

      <div className="container mx-auto mt-12 px-5 flex-grow">
        <h1 className="text-center text-4xl font-bold mb-10 text-indigo-600">Available Donations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donationList.map((donation, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow ease-in-out duration-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{donation.donationName}</h2>
              <p className="text-gray-600">
                <span className="font-semibold">Contact:</span> {donation.contactDetails}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Billing Address:</span> {donation.billingAddress}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Amount:</span> ${donation.amount}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Donation Type:</span> {donation.donationType}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Description:</span> {donation.description}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/editdonation/${donation.id}`}
                  className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 transition ease-in-out duration-200 py-2 px-4 rounded-lg"
                >
                  Edit
                </Link>
                <div className="space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200">Email</button>
                  <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200">
                    Notify
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    //     <div>
    //       <h2 id="donation-heading" data-cy="DonationHeading">
    //         Donations
    //         <div className="d-flex justify-content-end">
    //           <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
    //             <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
    //           </Button>
    //           <Link to="/donation/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
    //             <FontAwesomeIcon icon="plus" />
    //             &nbsp; Create a new Donation
    //           </Link>
    //         </div>
    //       </h2>
    //       <div className="table-responsive">
    //         {donationList && donationList.length > 0 ? (
    //           <Table responsive>
    //             <thead>
    //               <tr>
    //                 <th className="hand" onClick={sort('id')}>
    //                   ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('donationName')}>
    //                   Donation Name <FontAwesomeIcon icon={getSortIconByFieldName('donationName')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('contactDetails')}>
    //                   Contact Details <FontAwesomeIcon icon={getSortIconByFieldName('contactDetails')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('billingAddress')}>
    //                   Billing Address <FontAwesomeIcon icon={getSortIconByFieldName('billingAddress')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('amount')}>
    //                   Amount <FontAwesomeIcon icon={getSortIconByFieldName('amount')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('description')}>
    //                   Description <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('donationType')}>
    //                   Donation Type <FontAwesomeIcon icon={getSortIconByFieldName('donationType')} />
    //                 </th>
    //                 <th className="hand" onClick={sort('dateAndTime')}>
    //                   Date And Time <FontAwesomeIcon icon={getSortIconByFieldName('dateAndTime')} />
    //                 </th>
    //                 <th />
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {donationList.map((donation, i) => (
    //                 <tr key={`entity-${i}`} data-cy="entityTable">
    //                   <td>
    //                     <Button tag={Link} to={`/donation/${donation.id}`} color="link" size="sm">
    //                       {donation.id}
    //                     </Button>
    //                   </td>
    //                   <td>{donation.donationName}</td>
    //                   <td>{donation.contactDetails}</td>
    //                   <td>{donation.billingAddress}</td>
    //                   <td>{donation.amount ? <TextFormat type="date" value={donation.amount} format={APP_DATE_FORMAT} /> : null}</td>
    //                   <td>{donation.description}</td>
    //                   <td>{donation.donationType}</td>
    //                   <td>{donation.dateAndTime ? <TextFormat type="date" value={donation.dateAndTime} format={APP_DATE_FORMAT} /> : null}</td>
    //                   <td className="text-end">
    //                     <div className="btn-group flex-btn-group-container">
    //                       <Button tag={Link} to={`/donation/${donation.id}`} color="info" size="sm" data-cy="entityDetailsButton">
    //                         <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
    //                       </Button>
    //                       <Button
    //                         tag={Link}
    //                         to={`/donation/${donation.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
    //                         color="primary"
    //                         size="sm"
    //                         data-cy="entityEditButton"
    //                       >
    //                         <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
    //                       </Button>
    //                       <Button
    //                         onClick={() =>
    //                           (window.location.href = `/donation/${donation.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
    //           !loading && <div className="alert alert-warning">No Donations found</div>
    //         )}
    //       </div>
    //       {totalItems ? (
    //         <div className={donationList && donationList.length > 0 ? '' : 'd-none'}>
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

export default Donation;

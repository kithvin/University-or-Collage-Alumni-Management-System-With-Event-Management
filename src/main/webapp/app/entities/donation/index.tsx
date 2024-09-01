import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Donation from './donation';
import DonationDetail from './donation-detail';
import DonationUpdate from './donation-update';
import DonationDeleteDialog from './donation-delete-dialog';

const DonationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Donation />} />
    <Route path="new" element={<DonationUpdate />} />
    <Route path=":id">
      <Route index element={<DonationDetail />} />
      <Route path="edit" element={<DonationUpdate />} />
      <Route path="delete" element={<DonationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DonationRoutes;

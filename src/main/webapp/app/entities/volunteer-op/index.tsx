import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import VolunteerOP from './volunteer-op';
import VolunteerOPDetail from './volunteer-op-detail';
import VolunteerOPUpdate from './volunteer-op-update';
import VolunteerOPDeleteDialog from './volunteer-op-delete-dialog';

const VolunteerOPRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<VolunteerOP />} />
    <Route path="new" element={<VolunteerOPUpdate />} />
    <Route path=":id">
      <Route index element={<VolunteerOPDetail />} />
      <Route path="edit" element={<VolunteerOPUpdate />} />
      <Route path="delete" element={<VolunteerOPDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default VolunteerOPRoutes;

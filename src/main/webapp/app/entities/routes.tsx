import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Event from './event';
import Donation from './donation';
import Job from './job';
import News from './news';
import VolunteerOP from './volunteer-op';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="event/*" element={<Event />} />
        <Route path="donation/*" element={<Donation />} />
        <Route path="job/*" element={<Job />} />
        <Route path="news/*" element={<News />} />
        <Route path="volunteer-op/*" element={<VolunteerOP />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};

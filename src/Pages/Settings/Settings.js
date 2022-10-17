import React from 'react';
import { Container } from 'react-bootstrap';
import BudgetSection from '../../Helpers/BudgetSection';
import CategoriesSection from '../../Helpers/CategoriesSection';

const Settings = (props) => {
  return (
    <div>
      <Container>
        <div className="mb-3">
          <BudgetSection />
        </div>
        <div>
          <CategoriesSection />
        </div>
      </Container>
    </div>
  );
};

export default Settings;

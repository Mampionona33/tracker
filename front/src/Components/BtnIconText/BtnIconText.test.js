import { fireEvent, render } from '@testing-library/react';
import BtnIconText from './BtnIconText';
import React from 'react';

test('should render children', () => {
  const component = render(
    <BtnIconText title={'Title'}>
      <div>children</div>
    </BtnIconText>
  );
  const btnIcon = component.getByText('children');
  expect(btnIcon).toBeInTheDocument();
});

test('should render title', () => {
  const component = render(<BtnIconText title={'Title'}></BtnIconText>);
  const btnTitle = component.getByText('Title');
  expect(btnTitle).toBeInTheDocument();
});

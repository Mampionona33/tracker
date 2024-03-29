import { render } from '@testing-library/react';
import NavBar from './NavBar';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

test('should render menu btn', () => {
  const component = render(<NavBar />);
  const btnMenu = component.getByText(/menu/i);
  expect(btnMenu).toBeInTheDocument();
});

test('should render my pending task btn', () => {
  const component = render(<NavBar />);
  const btnMyPendingTask = component.getByText(/pending task/i);
  expect(btnMyPendingTask).toBeInTheDocument();
});

test('should render create new task btn', () => {
  const component = render(<NavBar />);
  const btnCreateNewTask = component.getByText(/new task/i);
  expect(btnCreateNewTask).toBeInTheDocument();
});

test('should render logout', () => {
  const component = render(<NavBar />);
  const btnLogout = component.getByText(/logout/i);
  expect(btnLogout).toBeInTheDocument();
});

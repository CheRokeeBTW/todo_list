import '@testing-library/jest-dom';
import { render, screen} from '@testing-library/react';
import {describe, expect, test} from '@jest/globals';
import React from 'react';
import App  from './App.tsx';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("todos");
  expect(linkElement).toBeInTheDocument();
});

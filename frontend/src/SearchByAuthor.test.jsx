import React from 'react';
//be sure to import render from @testing-library/react
import { render, screen, fireEvent } from '@testing-library/react';
import SearchByAuthor from './SearchByAuthor'; // Import the component to test
import ContextObject from './ContextObject'; // Import the context
import {describe, expect, it, vi} from 'vitest'


// Example context value
const contextValue = { state: 'someValue', setState: () => {} };

test('renders SomeComponent with context', () => {
  render(
    <ContextObject.Provider value={contextValue}>
      <SearchByAuthor />
    </ContextObject.Provider>
  );
  

  // Add assertions based on the context
  expect(screen.getByTestId('backgroundColor-container'))
  expect(screen.getByTestId('authorImages'))
  

});

test('tests text in element', () => {
    render(
        <ContextObject.Provider value={contextValue}>
          <SearchByAuthor />
        </ContextObject.Provider>
      );
      expect(screen.getByTestId('buttonSearch')).toHaveTextContent('Search')  
    })

test('button handle submit in form', () => {
    //create mock function
    const mockClickHander = vi.fn();
    const TestWrapper = () => {
        <SearchByAuthor handleSubmit={mockClickHander} />

    render(<TestWrapper />);

    fireEvent.click(screen.getByText('Search'));

    expect(handleClick).toHaveBeenCalled()
    }
})
      

import { server } from './mocks/server';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';

import Search from '../components/Search';
import { Provider } from 'react-redux';
import store from '../store';

const setup = () => render(
  <Provider store={store}>
    <Search />
  </Provider>
);

describe('Search API should render', () => {
  beforeEach(setup)
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers(); 
    cleanup();
  });
  afterAll(() => server.close());

  it('should render track search', async () => {
    const inputSearch = screen.getByPlaceholderText(/Artists, songs or albums/i);
    const btnSearch = screen.getByText(/Search/i);

    userEvent.type(inputSearch, 'test');
    userEvent.click(btnSearch);

    await screen.findByText(/Songs List:/i);
    const resultSearch = screen.getByTestId('resultSearch');

    expect(resultSearch).toBeInTheDocument();
    expect(screen.getByText('test api')).toBeInTheDocument();

  });
})

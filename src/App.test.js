import { render, screen, within, waitFor } from '@testing-library/react';
import App from './App';
import Search from './components/Search';
import { Provider } from 'react-redux';
import store from './store';
import { server } from './test/mocks/server';
import userEvent from '@testing-library/user-event';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Track components', () => {
  render(<App />);
  const Tracks = screen.getByTestId('tracks');
  const Track = within(Tracks).getAllByTestId('track');
  expect(Track.length).toBe(10);
});

test('renders login button', () => {
  render(<App />);
  const btnLogin = screen.getByTestId('btnLogin');
  expect(btnLogin).toBeInTheDocument();
})

test('renders search component', () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>
  )

  const formSearch = screen.getByTestId('formSearch');
  const playlist = screen.getByTestId('playlist');
  expect(formSearch).toBeInTheDocument();
  expect(playlist).toBeInTheDocument();
})

test('Search API Function', async () => {
  const { getByPlaceholderText, getByTestId, getByText } = render(<Provider store={store}><Search /></Provider>);
  const inputSearch = getByPlaceholderText(/Artists, songs or albums/i);
  userEvent.type(inputSearch, 'test');

  waitFor(() => {
    expect(getByTestId('resultSearch')).toBeInTheDocument();
    expect(getByText('test')).toBeInTheDocument();
  })
    
})
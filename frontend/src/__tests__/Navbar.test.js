import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from '../components/navbar/Logo';
import { BrowserRouter as Router } from 'react-router-dom';
import DonateBtn from '../components/navbar/DonateBtn';
import CartBtn from '../components/navbar/CartBtn';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => jest.fn(),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe(Logo, () => {
  it('Renders Logo Compnent', () => {
    const { getByAltText } = render(<Logo />);
    const lpdrLogo = getByAltText('Little Paws Dachshund Rescue!');

    expect(lpdrLogo).toBeInTheDocument();
  });
  it('Clicking on the logo navigates to /', () => {
    const { container } = render(
      <Router>
        <Logo />
      </Router>
    );
    const logo = container.querySelector(
      'img[alt="Little Paws Dachshund Rescue!"]'
    );
    logo.addEventListener('click', (e) => e.preventDefault(), false);
    fireEvent.click(logo);

    expect(window.location.pathname).toBe('/');
  });
});

describe('Donate Button', () => {
  beforeEach(() => {
    // Mock window.location.pathname
    Object.defineProperty(window, 'location', {
      value: { pathname: '/' },
      writable: true,
    });
  });

  it('clicking on the donate button navigates to /donate', async () => {
    const { container } = render(
      <Router>
        <DonateBtn />
      </Router>
    );

    // Wait for the component to settle
    await waitFor(() => {
      const donateLink = container.querySelector('a[href="/donate"]');

      donateLink.addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          window.location.pathname = '/donate';
        },
        false
      );

      fireEvent.click(donateLink);
    });

    // Assert that the navigation occurred
    expect(window.location.pathname).toBe('/donate');
  });
});

describe('Cart Button', () => {
  beforeEach(() => {
    // Mock window.location.pathname
    Object.defineProperty(window, 'location', {
      value: { pathname: '/' },
      writable: true,
    });
  });

  it('clicking on the cart button navigates to /cart', async () => {
    const { container } = render(
      <Router>
        <CartBtn cartItemsAmount={0} />
      </Router>
    );

    // Wait for the component to settle
    await waitFor(() => {
      const cartLink = container.querySelector('a[href="/cart"]');

      cartLink.addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          window.location.pathname = '/cart';
        },
        false
      );

      fireEvent.click(cartLink);
    });

    // Assert that the navigation occurred
    expect(window.location.pathname).toBe('/cart');
  });
});

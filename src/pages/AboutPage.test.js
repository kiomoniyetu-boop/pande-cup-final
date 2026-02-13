jest.mock('uuid');
import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
	test('renders Nipe Pande Cup heading', () => {
		render(<AboutPage />);
		const heading = screen.getByRole('heading', { name: /NIPE PANDE\./i });
		expect(heading).toBeInTheDocument();
	});

	test('renders The Dust. The Stage. The Future.', () => {
		render(<AboutPage />);
		expect(screen.getByText(/The Dust. The Stage. The Future./i)).toBeInTheDocument();
	});

	test('renders impact section titles', () => {
		render(<AboutPage />);
		expect(screen.getByText(/MTAA UNATULIA/i)).toBeInTheDocument();
		expect(screen.getByText(/SENSE OF BELONGING/i)).toBeInTheDocument();
		expect(screen.getByText(/UCHUMI WA MTAANI/i)).toBeInTheDocument();
	});
});

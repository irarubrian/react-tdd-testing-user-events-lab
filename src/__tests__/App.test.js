import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Correct import
import App from '../App'; // Adjust the path if necessary

describe('Newsletter Signup Form', () => {
  it('renders the form inputs and submit button', () => {
    render(<App />);
    
    // Check if the text inputs and button are present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest 2/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('allows the user to type in the name and email inputs', () => {
    render(<App />);
    
    // Simulate user input
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });

    // Check that the input values are updated correctly
    expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('john.doe@example.com');
  });

  it('allows the user to select interests', () => {
    render(<App />);

    // Simulate user selecting interests
    fireEvent.click(screen.getByLabelText(/interest 1/i));
    fireEvent.click(screen.getByLabelText(/interest 2/i));

    // Verify that the checkboxes are selected
    expect(screen.getByLabelText(/interest 1/i)).toBeChecked();
    expect(screen.getByLabelText(/interest 2/i)).toBeChecked();
  });

  it('displays a success message upon form submission', () => {
    render(<App />);

    // Simulate form submission
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.click(screen.getByLabelText(/interest 1/i));
    fireEvent.click(screen.getByLabelText(/interest 2/i));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Verify the success message is displayed
    expect(screen.getByText(/form submitted successfully/i)).toBeInTheDocument();
  });

  it("displays the user's interests in the success message", () => {
    render(<App />);

    // Simulate form submission
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.click(screen.getByLabelText(/interest 1/i));
    fireEvent.click(screen.getByLabelText(/interest 2/i));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Verify that the success message contains the user's interests
    expect(screen.getByText(/interests: interest 1, interest 2/i)).toBeInTheDocument();
  });
});

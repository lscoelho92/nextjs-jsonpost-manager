import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '@/components/ConfirmModal';

describe('ConfirmModal', () => {
  it('should render the modal when isOpen is true', () => {
    render(
      <ConfirmModal 
        isOpen={true} 
        onCancel={jest.fn()} 
        onConfirm={jest.fn()} 
      />
    );

    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this post?')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should not render the modal when isOpen is false', () => {
    render(
      <ConfirmModal 
        isOpen={false} 
        onCancel={jest.fn()} 
        onConfirm={jest.fn()} 
      />
    );

    expect(screen.queryByText('Confirm Deletion')).toBeNull();
    expect(screen.queryByText('Are you sure you want to delete this post?')).toBeNull();
  });

  it('should call onCancel when Cancel button is clicked', () => {
    const onCancelMock = jest.fn();

    render(
      <ConfirmModal 
        isOpen={true} 
        onCancel={onCancelMock} 
        onConfirm={jest.fn()} 
      />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm when Delete button is clicked', () => {
    const onConfirmMock = jest.fn();

    render(
      <ConfirmModal 
        isOpen={true} 
        onCancel={jest.fn()} 
        onConfirm={onConfirmMock} 
      />
    );

    fireEvent.click(screen.getByText('Delete'));

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
});

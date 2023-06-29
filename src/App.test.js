import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

describe('<App />', () => {

  // Test 1: Ensure that the component renders without crashing
  test('renders without crashing', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    await waitFor(() => {}); // wait for asynchronous updates
  });

  // Test 2: CircularProgress is visible while data is being fetched
  test('shows CircularProgress while loading', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
  });

  // Test 3: Renders the correct number of images on successful API call
  test('renders correct number of images on successful API call', async () => {
    const photos = [
      { id: 1, url: 'https://example.com/photo1', title: 'photo1' },
      { id: 2, url: 'https://example.com/photo2', title: 'photo2' },
    ];

    axios.get.mockResolvedValue({ data: photos });
    render(<App />);

    const images = await screen.findAllByRole('img');
    expect(images).toHaveLength(photos.length);
  });

  // Test 4: Renders "No images found" when API returns empty array
  test('renders "No images found" when API returns empty array', async () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    expect(await screen.findByText("No images found")).toBeInTheDocument();
  });

  // Test 5: Album ID header is rendered when queryParam is not null
  test('renders Album ID header when queryParam is not null', async () => {
    const photos = [
      { id: 1, url: 'https://example.com/photo1', title: 'photo1' },
    ];

    axios.get.mockResolvedValue({ data: photos });
    delete window.location;
    window.location = new URL('http://test.com/?albumId=1');
    
    render(<App />);
    expect(await screen.findByText("Album ID: 1")).toBeInTheDocument();
  });
});

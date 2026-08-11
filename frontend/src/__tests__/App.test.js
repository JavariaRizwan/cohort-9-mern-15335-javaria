import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import App from '../App';

jest.mock('axios')

const testApp=(inititalRoute = '/')=>{

    return render(
        <MemoryRouter initialEntries={[inititalRoute]}>
        <App />
        </MemoryRouter>
    )
}

    describe("App test omponent", ()=>{
        beforeEach(()=>{
            jest.clearAllMocks();
        })
    
    it("shows the Home page when here is no actve session of user", async()=>{
axios.get.mockRejectedValue(new Error('Unauthorized user'));
testApp('/');

const getStartedButton=await screen.findByRole('button', {name: /Get Started/i});
expect(getStartedButton).toBeInTheDocument();
    })
    })



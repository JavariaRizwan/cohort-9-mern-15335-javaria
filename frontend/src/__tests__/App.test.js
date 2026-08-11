import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import App from '../App';



jest.mock('axios')

const testApp=(initialRoute = '/')=>{

try {
        return render(
            <MemoryRouter initialEntries={[initialRoute]}>
                <App />
            </MemoryRouter>
        );
    } catch (error) {
        console.error("Error during testApp render:", error);
        throw error;
    }
}

    describe("App test omponent", ()=>{
        beforeEach(()=>{
            jest.clearAllMocks();
                    axios.get.mockResolvedValue({ data: { success: false, valid: false } });

        });
    
    it("shows the Home page when here is no actve session of user", async()=>{

        try {
testApp('/');

const nav = screen.getByRole('navigation');

const getStartedButton = within(nav).getByRole('button', { name: /get started/i });
expect(getStartedButton).toBeInTheDocument();
            
        } catch (error) {   
        console.error("Test execution failed:", error);
            throw error;            
        }
    })
    })



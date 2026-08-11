import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import DownloadNote from '../additional-features/DownloadNote';


describe("Download Note Component", ()=>{
    it("Shows the download button and triggers action on clicking it", async()=>{

        const testingNote={
            title: "Testing NOte",
            description:"description for testing note",
            category:"Grocery",
            subCategory:"Household Items"
        };

        window.URL.createObjectURL = jest.fn();
        window.URL.revokeObjectURL = jest.fn();

        render(<DownloadNote note={testingNote}/>);

        const button=screen.getByTitle(/Download/i);
        expect(button).toBeInTheDocument();

        await userEvent.click(button);

        expect(window.URL.createObjectURL).toHaveBeenCalled();
        expect(window.URL.revokeObjectURL).toHaveBeenCalled();
    })
})
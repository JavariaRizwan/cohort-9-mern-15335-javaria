
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImportFile from '../additional-features/ImportFile';

describe("Import button component", ()=>{
    it("shoudl show the button", async()=>{
        render(<ImportFile />);
        const button=screen.getByText(/Import Note/i);
        expect(button).toBeTruthy();
    });
    it("sould open popup for file selection", async()=>{
        // reatng a testing function props
        const testOnFileImport=jest.fn();
        render(<ImportFile onFileImport={testOnFileImport}/>);
        
        //finding te hidden input field for file upload
        const file=document.querySelector('input[type="file"]')

        const testingFile=new File(['This is a testing file uploaded'], 'note.txt', 
          { type:'text/plain' }
        )
await userEvent.upload(file, testingFile);
        expect(testOnFileImport).toHaveBeenCalledWith('This is a testing file uploaded');
    })

    it("should show an error when an invalid file type is uploaded", async () => {
        const testOnFileImport = jest.fn();
        render(<ImportFile onFileImport={testOnFileImport} />);
        
        const file = document.querySelector('input[type="file"]');
        
        const invalidFile = new File(['dummy image content'], 'image.png', { type: 'image/png' });

        await userEvent.upload(file, invalidFile);

        expect(testOnFileImport).not.toHaveBeenCalled();
    });
})
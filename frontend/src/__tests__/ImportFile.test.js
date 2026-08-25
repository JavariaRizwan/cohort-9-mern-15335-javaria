
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImportFile from '../additional-features/ImportFile';


if (typeof File !== 'undefined' && !File.prototype.text) {
  File.prototype.text = function () {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(this);
    });
  };
}


describe("Import button component", ()=>{
    it("shoudl show the button", async()=>{
        render(<ImportFile />);
        const button=screen.getByText(/Import Note/i);
        expect(button).toBeTruthy();
    });
    it("sould open popup for file selection", async()=>{
        const testOnFileImport=jest.fn();
        render(<ImportFile onFileImport={testOnFileImport}/>);
        
        const file=document.querySelector('input[type="file"]')

        const testingFile=new File(['This is a testing file uploaded'], 'note.txt', 
          { type:'text/plain' }
        )
await userEvent.upload(file, testingFile);
await waitFor(()=>{
    expect(testOnFileImport).toHaveBeenCalledWith('This is a testing file uploaded');
    
})
    })

    it("should show an error when an invalid file type is uploaded", async () => {
        const testOnFileImport = jest.fn();
        render(<ImportFile onFileImport={testOnFileImport} />);
        
        const file = document.querySelector('input[type="file"]');
        
        const invalidFile = new File(['dummy image content'], 'image.png', { type: 'image/png' });

        await userEvent.upload(file, invalidFile);
await waitFor(()=>{
    expect(testOnFileImport).not.toHaveBeenCalled();
    
})
    });
})
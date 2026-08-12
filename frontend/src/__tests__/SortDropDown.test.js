import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SortDropDown from '../components/NotesPages/SortDropDown';
import sortingOptions from '../data/sortingOptions';


describe("Sort Dropdown Options", ()=>{
    it("shoudl show all sorting options from the file", ()=>{
        try {
        const mockSetSortBy=jest.fn();
            render(
                <SortDropDown sortBy="newest" setSortBy={mockSetSortBy} />
            )

            const seletedOption=screen.getByLabelText(/Sort Notes/i);
            expect(seletedOption).toBeInTheDocument();
            sortingOptions.forEach((option) => {
            const optionElement = screen.getByRole('option', { name: new RegExp(option.label, 'i') });
            expect(optionElement).toBeInTheDocument();
            expect(optionElement.value).toBe(option.value);
        });


        } catch (error) {
            console.error("Erro ocured while loading options from file", error.message)
        }
 
    })
})
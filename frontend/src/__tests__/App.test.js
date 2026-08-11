import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from '../App';

jest.mock('axios')

const testApp=()=>{

    return render=()=>{
        <BrowserRouter>
        <App />
        </BrowserRouter>
    }


}
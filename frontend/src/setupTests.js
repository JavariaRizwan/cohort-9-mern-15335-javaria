import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util';

if (global.TextEncoder === undefined) {
    global.TextEncoder = TextEncoder;
}
if (global.TextDecoder === undefined) {
    global.TextDecoder = TextDecoder;
}
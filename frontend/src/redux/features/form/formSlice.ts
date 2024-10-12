import { createSlice, Reducer } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';

interface FormStatePayload {
  loading: boolean;
  success: boolean;
  error: string | false | null;
  message?: string;
  fields: {} | null | any;
}

const initialFormState: FormStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  fields: null,
};

const secretKey = process.env.SECRET_KEY || 'default-secret-key';

export const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  reducers: {
    saveFormData: (_, { payload }) => {
      const encryptedData = localStorage.getItem('formData');
      let existingData = {};

      if (encryptedData) {
        try {
          const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
          existingData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
          console.error('Failed to decrypt form data:', error);
        }
      }

      // Combine existing data with new data
      const updatedData = {
        ...existingData,
        ...payload.inputs,
      };

      // Encrypt the updated data
      const newEncryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(updatedData),
        secretKey
      ).toString();

      // Save the updated encrypted data to local storage
      localStorage.setItem('formData', newEncryptedData);
    },
    updateFormData: (_, { payload }) => {
      let existingData = {};

      const encryptedData = localStorage.getItem('formData');
      if (encryptedData) {
        try {
          const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
          existingData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
          console.error('Failed to decrypt form data:', error);
        }
      }

      // Merge existing data with new data
      const updatedData = {
        ...existingData,
        ...payload.inputs,
      };

      // Encrypt the updated data
      const newEncryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(updatedData),
        secretKey
      ).toString();

      // Save the updated encrypted data to local storage
      localStorage.setItem('formData', newEncryptedData);
    },
    decryptFormData: (state) => {
      const encryptedData = localStorage.getItem('formData');

      // If no data is found, simply return without logging anything
      if (!encryptedData) {
        return;
      }
    
      try {
        // Attempt to decrypt the data
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    
        // Ensure the decrypted string is valid before parsing
        if (!decryptedString) {
          console.error('Decryption returned an empty string or invalid data.');
          return;
        }
    
        // Parse and update state if decryption was successful
        const decryptedData = JSON.parse(decryptedString);
        state.fields = decryptedData;
      } catch (error) {
        console.error('Failed to decrypt or parse form data:', error);
      }
    },
  },
});

export const formReducer = formSlice.reducer as Reducer<FormStatePayload>;

export const { saveFormData, updateFormData, decryptFormData } = formSlice.actions;

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle<{
  hideScrollBar?: boolean;
  theme: any;
  hasClickedHamburger?: boolean;
}>`
  body {
    background: ${({ theme }) => theme.bg};
    overflow:${({ hasClickedHamburger }) =>
      hasClickedHamburger ? 'hidden' : ''};
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius:auto;
    border-radius:auto;
    background:auto; 
    -webkit-box-shadow:auto;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: auto; 
    -webkit-border-radius: auto;
    border-radius: auto;
    background:auto;    
  
}


.eCardsContainer::-webkit-scrollbar,    
.eCardsContainer::-webkit-scrollbar-button,
.eCardsContainer::-webkit-scrollbar-track
{
  background:${({ theme }) => theme.bg} !important;
}

.eCardsContainer::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.colors.primary};
}

.eCardsContainer::-webkit-scrollbar-track-piece {
  background: ${({ theme }) => theme.input.bg};
}

.Toaster__alert_close {
  display: none;
}

  .one-time:hover, .monthly:hover, .e-card:hover, .one-time-still, .monthly-still, .e-card-still {
    --angle: 0deg;
    border: 1px solid transparent;
    border-image: ${({ theme }) =>
      `linear-gradient(var(--angle), ${theme.colors.primary}, ${theme.colors.secondary}) 1`} ;
    border-image-slice:1;
    animation: 1s rotate linear infinite;
  }

  @keyframes rotate {
    to {
    --angle: 360deg;
    }
  }

  input, select {
    background: ${({ theme }) => theme.input.bg} !important;
    transition: 300ms;
    height: 40px !important;
    font-family: 'Libre Franklin', sans-serif  !important;
    border-radius: 0  !important;
    border-bottom: 1px solid ${({ theme }) => theme.separator}  !important;
    box-shadow: 0 !important;
    padding: 6px 0px !important;
    color: ${({ theme }) => theme.text} !important;
    text-indent: 0.5rem;
    border:1px solid ${({ theme }) => theme.input.border} !important;

  }

  textarea {
    background: ${({ theme }) => theme.input.bg} !important;
    transition: 300ms;
    margin: 0.25rem 0 1rem  !important;
    font-family: 'Libre Franklin', sans-serif  !important;
    border-radius: 6px  !important;
    box-shadow: 0 !important;
    padding: 6px 0px !important;
    color: ${({ theme }) => theme.text} !important;
    text-indent: 0.5rem;
    border:1px solid ${({ theme }) => theme.input.border} !important;
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: ${({ theme }) =>
      `url("data:image/svg+xml;utf8,<svg fill='${
        theme.mode === 'day' ? 'black' : 'yellow'
      }' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`} !important;
    background-repeat: no-repeat !important;
    background-position-x: 95% !important;
    background-position-y: 10px !important;
    z-index: 5 !important;

  }

  label {
    margin-bottom:5px !important;
  }

  .form-control:focus {
    box-shadow: none !important;
  }

  .form-control::placeholder{
    color: ${({ theme }) => theme.text} !important;
  }

  input.form-control:hover, input.form-control:focus, input.form-control:active, select.form-control:hover, select.form-control:focus, select.form-control:active {
    border-radius: 0  !important;
    box-shadow: 0 !important;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blue04}  !important;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active
  {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-box-shadow:${({ theme }) =>
      `0 0 0px 1000px ${theme.secondaryBg} inset`} !important ;
    box-shadow:${({ theme }) =>
      `0 0 0px 1000px ${theme.secondaryBg} inset`} !important;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: ${({ theme }) => theme.formControlInput.text};

  }

  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus,
  select:-webkit-autofill:active 
  {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-box-shadow:${({ theme }) =>
      `0 0 0px 1000px ${theme.secondaryBg} inset`}  !important;
    box-shadow:${({ theme }) =>
      `0 0 0px 1000px ${theme.secondaryBg} inset`} !important;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: ${({ theme }) => theme.text};
  }

  a.page-link {
    color: ${({ theme }) => theme.text};
    background: transparent;
    border: none !important;
  }
  a.page-link:hover {
    background-color: ${({ theme }) => theme.colors.secondary} !important
  }
  span.page-link {
    background-color: ${({ theme }) => theme.colors.secondary} !important;
    border: none !important;
  }

  label.form-label {
    color: ${({ theme }) => theme.text};
  }

  .main-links {
    height:2rem;
    display: flex;
    align-items:center;
  }

  .modal-backdrop + .popup {
    background: rgba(0, 0, 0, 0.1);
  }

  /* image for profile */
.image-avatar > label {
  height: 200px;
  width: 200px;
  border: ${({ theme }) => `3px solid ${theme.input.bg}`};
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  margin:auto;
}

/* removes blue box shadow */
.custom-file-input:focus ~ .custom-file-label {
  border: ${({ theme }) => `3px solid ${theme.input.bg}`};
  box-shadow: none;
}

h5 {
  color: ${({ theme }) => theme.header.link.dropDown.text};
}

::-webkit-calendar-picker-indicator {
    filter:${({ theme }) => (theme.mode === 'day' ? '' : 'invert(1)')};
    position: absolute;
    left: 150px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}


`;

export default GlobalStyles;

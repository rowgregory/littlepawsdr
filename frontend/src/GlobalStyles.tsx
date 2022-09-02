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

.accordion .faq:hover {
  background: ${({ theme }) => theme.colors.primary};
  transition: 300ms;
  border-radius: 0;
}
.accordion .faq:hover div {
  color: #fff;
}

.table-responsive {
  height:1000px;
  overflow:scroll;
} 
thead tr:nth-child(1) th {
  background: ${({ theme }) => theme.colors.primary};
  position: sticky;
  top: 0;
  z-index: 2;
}

tbody {
    tr {
      :nth-child(even) {
        background-color: ${({ theme }) => theme.table.odd};
      }
    }
  }

div, span, p, h1, h2, h3, h4, h5, h6, input, select, ::placeholder, label, li {
  font-family: Oswald;
  color: ${({ theme }) => theme.text};
}

.page-item.active .page-link {
    background: ${({ theme }) => theme.smcontainer.bg} !important;
    color: #fff !important;
    &:hover {
      background: ${({ theme }) => theme.smcontainer.bg} !important;
      color: #fff !important;

    }
}

.carousel-control-prev, .carousel-control-next {
  background-color: ${({ theme }) => theme.smcontainer.bg};
}

.Toaster__alert_close {
  display: none;
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
    box-shadow: 0 !important;
    padding: 6px 0px !important;
    color: ${({ theme }) => theme.text} !important;
    text-indent: 0.5rem;
    border:${({ theme }) => `1px solid ${theme.separator}`} !important;
    &.popup { border-right: none !important;}
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
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active
  {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-box-shadow:${({ theme }) =>
      `0 0 0px 1000px ${theme.input.bg} inset`} !important ;
    box-shadow:${({ theme }) =>
      `0 0 0px 1000px ${theme.input.bg} inset`} !important;
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
      `0 0 0px 1000px ${theme.input.bg} inset`}  !important;
    box-shadow:${({ theme }) =>
      `0 0 0px 1000px ${theme.input.bg} inset`} !important;
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

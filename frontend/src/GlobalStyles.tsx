import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle<{
  theme: any;
}>`
body {
  background: ${({ theme }) => theme.bg};
}

.modal {
padding-right: 0px !important;
}

input[name='profileCardTheme'] {
  display: none !important;
}
input[name='background'] {
  display: none !important;
}

.one-time-donation-auction {
  div {
    max-width: 400px !important;
    width: 100% !important;
    margin-inline: auto !important;
    border-radius: 6px !important;

  }
}

.auction-support-textarea {
  background: #f9fafb !important;
}

.auction-item .form-file-label {
  width: 100% !important;
}

div, span, p, input, select, ::placeholder, label, li {
  color: ${({ theme }) => theme.text};
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6 {
  color: ${({ theme }) => theme.text};
  font-weight: 300;
}

.close {
  display: none;
}

/* scrollbar */

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
  background: auto;
}

/* calendar */

::-webkit-calendar-picker-indicator .ecard {
    filter:${({ theme }) => (theme.mode === 'day' ? '' : 'invert(1)')};
    position: absolute;
    left: 150px;
}

input[type='month'] .ecard, input[type='date'] .ecard {
  ::-webkit-calendar-picker-indicator {
    position: absolute;
    z-index: 5;
    opacity: 1;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
      left: 200px;
    }
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
      left: 125px;
    }
  }
}

.custom-control-input:checked~.custom-control-label::before {
  color: #fff;
  border-color: ${({ theme }) => theme.colors.quinary};
  background-color: ${({ theme }) => theme.colors.quinary};
  outline-color: ${({ theme }) => theme.colors.quinary} !important;
}

.auction .custom-control-input:checked + .custom-control-label::before {
  color: #fff;
  border-color: #74d145;
  background-color: #74d145;
  outline-color: #74d145 !important;
}

.auction .custom-control-input:focus + .custom-control-label::before {
  box-shadow: none !important;
  outline: none !important;
}

thead tr:nth-child(1) th {
  position: sticky;
  top: 0;
  z-index: 2;
}

/* carousel */

.carousel-item-next,
.carousel-item-prev,
.carousel-item.active {
  display: flex;
}
.carousel-control-next,
.carousel-control-prev {
  width: 75px;
}

.carousel img {
  width: 100%;
  object-fit: cover;
}

.carousel a {
  margin: 0 auto;
}

@keyframes rotate {
    to {
    --angle: 360deg;
    }
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* removes radio button */
  input[type='radio'].bgColor {
  visibility: hidden;
  display: none;
}
 input[type='radio'].event-radio {
  visibility: hidden;
  display: none;
}


/* removes image path */
input#image.img-link,
.form-control-file,
.form-control-range {
  display: none;
}

/* removes blue box shadow */
.custom-file-input:focus ~ .custom-file-label {
  border: ${({ theme }) => `3px solid ${theme.input.bg}`};
  box-shadow: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;

export default GlobalStyles;

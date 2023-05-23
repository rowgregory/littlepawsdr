import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle<{
  theme: any;
}>`
body {
  background: ${({ theme }) => theme.bg};
}

div, span, p, input, select, ::placeholder, label, li {
  font-family: 'Roboto';
  color: ${({ theme }) => theme.text};
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6 {
  color: ${({ theme }) => theme.text};
  font-family: 'Roboto';
  font-weight: 300;
}

.close {
  display: none;
}

/* pagination */

.pagination {
  border: 1px solid #ededed;
}

.page-link {
  background: #fff;
  color: ${({ theme }) => theme.colors.quinary};
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-link:hover {
  background-color: ${({ theme }) => theme.secondaryBg} !important;
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

::-webkit-calendar-picker-indicator {
    filter:${({ theme }) => (theme.mode === 'day' ? '' : 'invert(1)')};
    position: absolute;
    left: 150px;
}

input[type='month'], input[type='date'] {
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

.accordion .faq:hover {
  background: ${({ theme }) => theme.colors.quinary};
  transition: 300ms;
  border-radius: 0 !important;
}
.accordion .faq:hover div {
  color: #fff;
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

input {
  background: ${({ theme }) => theme.input.bg} !important;
  transition: 300ms;
  height: 45px !important;
  font-family: 'Roboto'  !important;
  border-radius: 0  !important;
  box-shadow: 0 !important;
  padding: 6px 0px !important;
  color: ${({ theme }) => theme.text} !important;
  text-indent: 18px;
  
  &.popup { border-right: none !important;}
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* removes radio button */
  input[type='radio'] {
  visibility: hidden;
  display: none;
}

/* removes image path */
input#image.img-link,
.form-control-file,
.form-control-range {
  display: none;
}

input[name='cardnumber'] {
  color: #5469d4;
}

textarea {
  background: ${({ theme }) => theme.input.bg} !important;
  transition: 300ms;
  margin: 0.25rem 0 0  !important;
  font-family: Roboto  !important;
  border-radius: 0px  !important;
  box-shadow: 0 !important;
  color: ${({ theme }) => theme.text} !important;
  border:0 !important;
  :focus {
    outline: none !important;
  }
}

select {
  background: ${({ theme }) => theme.input.bg} !important;
  transition: 300ms;
  height: 45px !important;
  font-family: 'Roboto'  !important;
  border-radius: 0  !important;
  box-shadow: 0 !important;
  padding: 6px 0px !important;
  color: ${({ theme }) => theme.text} !important;
  text-indent: 18px;
  
  &.popup { border-right: none !important;}
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

.modal-backdrop + .popup {
  background: rgba(0, 0, 0, 0.1);
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

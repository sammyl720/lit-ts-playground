import { css } from "lit-element";

export default css`
button {
  outline: none;
  border: none;
  background: #33c3f4;
  color: #f1f1f1;
  border-radius: 4px;
  cursor: pointer;
}

button:active {
  border:none;
  outline: none;
}

.btn-sm { font-size: 16px; padding: 4px 8px; }
.btn-md { font-size: 22px; padding: 8px 16px; }
.btn-lg { font-size: 26px; padding: 12px 24px; }
`;
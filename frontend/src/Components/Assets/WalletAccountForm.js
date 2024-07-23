import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function WalletAccountForm({ toggleForm }) {
  const { addWalletAccount, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    name: "",
    amount: "",
    description: "",
  });

  // Use a separate error state for the bank account form
  const [WalletAccountFormError, setWalletAccountFormError] = useState("");

  const { name, amount, description } = inputState;

  const handleInput = (input) => (e) => {
    setInputState({ ...inputState, [input]: e.target.value });
    setWalletAccountFormError(""); // Clear validation errors on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for validation errors
    if (!name || !amount) {
      setWalletAccountFormError("Mandatory fields are required!"); // Show validation error
      return; // Don't proceed with submission
    }

    // Check for valid amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setWalletAccountFormError("Amount must be a positive number!"); // Show validation error
      return; // Don't proceed with submission
    }

    // If validation passes, add bank account
    addWalletAccount(inputState);
    toggleForm(); // Close form after submit
    setInputState({
      name: "",
      amount: "",
      description: "",
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {WalletAccountFormError && <p className="error">{WalletAccountFormError}</p>}
      <div className="input-control">
        <input
          type="text"
          value={name}
          name="name"
          placeholder="Wallet Name"
          onChange={handleInput("name")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name="amount"
          placeholder="Amount"
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <input
          value={description}
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleInput("description")}
        />
      </div>
      <div className="submit-btn">
        <Button
          name={"Add Account"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent-green"}
          color={"#fff"}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
    .custom-datepicker {
      width: 365px;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default WalletAccountForm;

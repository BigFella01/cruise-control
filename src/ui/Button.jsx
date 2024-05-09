import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1rem;
    padding: 0.6rem 1rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-teal-100);
    background-color: var(--color-teal-600);
    box-shadow: var(--shadow-sm);

    &:hover {
      background-color: var(--color-teal-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    box-shadow: var(--shadow-sm);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);
    box-shadow: var(--shadow-sm);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  toggle: css`
    color: var(--color-grey-600);
    background-color: var(--color-grey-0);
    border: none;

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
};

const Button = styled.button`
  display: block;
  margin: ${(props) => props.margin};
  border: none;
  border-radius: var(--border-radius-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;

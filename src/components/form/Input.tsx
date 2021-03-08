import React, { useState, useCallback } from "react";
import styled from "styled-components";
import * as font from "@Styles/font";
import { color } from "@Styles/variables";

const Size = {
  xLarge: {
    fontSize: 16,
    height: "64px",
    minWidth: "200px",
    padding: "20px 64px 20px 24px",
    iconSize: "24px",
    marginRight: "0px",
    borderRadius: "8px",
  },
  large: {
    fontSize: 16,
    height: "42px",
    minWidth: "90px",
    padding: "9px 42px 9px 20px",
    iconSize: "16px",
    marginRight: "8px",
    borderRadius: "21px",
  },
  middle: {
    fontSize: 14,
    height: "34px",
    minWidth: "80px",
    padding: "7px 34px 7px 18px",
    iconSize: "16px",
    marginRight: "8px",
    borderRadius: "21px",
  },
};

const setSize = (props) => `
  & {
    height: ${props.SizeObject.height};
    padding: ${props.SizeObject.padding};
    min-width: ${props.SizeObject.minWidth};
    border-radius: ${props.SizeObject.borderRadius};

    border: 1px solid ${color.$grey05}
  }

  display: inline-block;
`;

// size : xlg, lg, md
const Box = styled.div.attrs(({ size = "md" }: { size: string }) => {
  const SizeObject =
    {
      xlg: Size.xLarge,
      md: Size.middle,
    }[size] || Size.large;

  return {
    size: SizeObject.fontSize,
    SizeObject,
  };
})`
  ${setSize}

  input {
    ${font.Text}
    border: none;
    outline: none;
  }
`;

interface Props {
  style: object;
  placeholder: string;
  submit: (value: string) => void;
  interval: number;
  size: "md" | "lg" | "xlg";
}

const Input = ({ style, submit, placeholder, interval, size }: Props) => {
  const [value, setValue] = useState<string>("");
  const [timer, setTimer] = useState<null | ReturnType<typeof setTimeout>>();

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        clearTimeout(timer);
        submit(value);
      }
    },
    [value, timer, submit]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timer);
      const v = e.target.value;
      setValue(v);

      let n: null | ReturnType<typeof setTimeout> = null;
      n = setTimeout(() => {
        submit(v);
      }, interval);

      setTimer(n);
    },
    [timer, submit]
  );

  return (
    <Box style={style} size={size}>
      <input
        onKeyPress={onKeyPress}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Box>
  );
};

Input.defaultProps = {
  size: "md",
  placeholder: "",
  submit: () => {},
  interval: 1000,
};

export default Input;

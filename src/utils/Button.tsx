import React from "react";
import { CSSProperties } from "react";

export default function Button(props: buttonProps) {
    return (
        <button
            type={props.type}
            className={props.className}
            onClick={props.onClick}
            disabled={props.disabled}
            style={props.style}
        >
            {props.children}
        </button>
    );
}

interface buttonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type: "submit" | "button";
    disabled: boolean;
    className: string;
    style: CSSProperties;
}

Button.defaultProps = {
    type: "button",
    disabled: false,
    className:
        "inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded [py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600",
    style: {},
};

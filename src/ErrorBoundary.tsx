import React, { ReactElement } from "react";

export default class ErrorBoundary extends 
    React.Component<errorBoundaryProps, errorBoundaryState> {
    constructor(props: errorBoundaryProps) {
        super(props);
        this.state = {
            hayError: false,
            mensaje: ""
        };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("Error capturado por ErrorBoundary: ", error, errorInfo);
    }

    static getDerivedStateFromError(error: any) {
        return { hayError: true, mensaje: error.message };
    }

    render() {
        if (this.state.hayError) {
            return this.props.errorUI ? this.props.errorUI : <div>Error: {this.state.mensaje}</div>;
        }

        return this.props.children;
    }
}

interface errorBoundaryState {
    hayError: boolean;
    mensaje: string;
}

interface errorBoundaryProps {
    errorUI?: ReactElement
    children?: ReactElement;
}
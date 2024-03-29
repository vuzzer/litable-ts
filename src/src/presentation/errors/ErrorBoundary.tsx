import { Component } from "react";


interface PropsType {
    children: JSX.Element,
    fallback: string
}

interface StatesType {
    hasError: boolean
}

class ErrorBoundary extends Component<PropsType, StatesType>{
    constructor(props:PropsType){
        super(props)
        this.state  = {
            hasError: false
        } 
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render(){
        if(this.state.hasError){
            return <p>{this.props.fallback}</p>
        }
        return this.props.children
    }
}

export default ErrorBoundary













/* import { useRouteError } from "react-router-dom";

export default function () {
    const error = useRouteError()
    return (
        <div>
            <h1>Oops</h1>
            <p>Sorry, an unexpected has occured</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
} */

import React from "react";

export default function About() {
    return (
        <div>
            <h1 className="font-bold md:text-5xl lg:text-2xl text-center mb-1">
                Acerca de
            </h1>
            <hr className="mb-10" />
            <p>
                Esta aplicación fue desarrollada por {" "}
                <a href="#">
                    César Martínez
                </a>
            </p>
        </div>
    );
    
};

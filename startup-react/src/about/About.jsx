import React from 'react';

export function About(email) {
    return (
        <main className="flex-auto h-screen flex flex-col justify-center p-20">
            <div className="flex-none self-center text-4xl">Founders</div>
            <hr/>
            <div className="mt-4">
                Once upon a time there was a group of three friends named Cooper, Kelly, and Reed. They had an idea to
                create a
                shipping website that caters to clothing brands, and helps them sell their products. It just so happened
                that Cooper
                was about to take a web development class in college, and the rest is history.
            </div>
        </main>
    );
}
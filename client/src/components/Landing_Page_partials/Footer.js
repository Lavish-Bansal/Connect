import React from 'react';

function Footer() {
    return (
        <div style={{ backgroundColor: "#f05454", height: "9rem" }} className='bg-indigo-800 w-100 h-80 text-white flex flex-col items-center justify-center'>
            <div style={{display: "flex", gap: 12, marginBottom: 15}} className='flex-shrink-0 flex items-center'>
                <img
                    src="/favicon/favicon.ico"
                    width={500}
                    height={500}
                    alt="Logo"
                    className="h-8 w-8"
                />
                <h1>CampusConnect</h1>
            </div>
            <h2>Copyright © 2024. All rights reserved.</h2>
        </div>
    );
}

export default Footer;
import React from "react";

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-neutral-300 text-base-content rounded p-10">
            <p>
                Copyright © {new Date().getFullYear()} - All right reserved by
                Result Processing System
            </p>
        </footer>
    );
};

export default Footer;

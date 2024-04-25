import Header from "@/components/Landing_Page_partials/Header";
import HeroHome from "@/components/Landing_Page_partials/HeroHome";
import About from "@/components/Landing_Page_partials/About";
import Footer from "@/components/Landing_Page_partials/Footer";
import React from "react";

function LandingPage() {
    return (
        <div className="overflow-x-hidden">
            <div className="flex flex-col min-h-screen overflow-x-hidden ">
                <Header className="overflow-x-hidden" />

                <main className="grow">
                    <HeroHome />
                    <About />
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default LandingPage;

import React from "react";
import Hero from "./Home/hero";
import Features from "./Home/features";
import Testimonials from "./Home/testimonials";
import Footer from "./Home/footer";


function  Home(){
    return (
        <div>
            <Hero />
            <Features />
            <Testimonials />
            <Footer />
        </div>
    )

}
export default Home
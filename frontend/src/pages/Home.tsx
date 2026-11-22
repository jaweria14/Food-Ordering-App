import React from "react";
import Hero from "../components/Hero";
import Catogories from "../components/Catogories";
import FeaturedResturant from "../components/FeaturedResturant"
import Offerbanner from "@/components/Offerbanner";

export default function Home(){
    return(
        <>
        
         <FeaturedResturant/>
        <Catogories/>
        <Offerbanner/>
       
        </>
    )
}
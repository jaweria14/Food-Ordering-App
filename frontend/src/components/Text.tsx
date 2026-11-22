import React from "react";
type Props ={
    heading:string,
    subheading :string
}

export default function Text({heading,subheading}:Props){
    return(
       <div className="">
            <h2 className="font-bold pb-3 text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-center text-[#1F2933]">{heading}</h2>
           
               <p className="w-full max-w-[500px]  text-base sm:text-lg md:text-xl text-[#6B7280] text-center">{subheading}
        </p>
       </div>
    )
}
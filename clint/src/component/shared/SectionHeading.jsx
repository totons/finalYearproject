import React from 'react';

const SectionHeading = ({title,desc}) => {
    return (
        <div className="hero bg-[#94a3b8] h-[480px] mt-10">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="py-6 ">
             {desc}
            </p>
           
          </div>
        </div>
      </div>
    );
}

export default SectionHeading;

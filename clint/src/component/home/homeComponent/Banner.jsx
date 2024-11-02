import banner from '../../../assets/banner1.jpg';

// import banner from '../assets/bani.jpg';
import { Rotate, Fade } from "react-awesome-reveal";

const Banner = () => {
    return (
        <div className='bg-slate-400 max-w-7xl mx-auto mt-16 p-10'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <Rotate>
                        <p className='text-xl font-semibold text-justify'>
                        Learning to Learn Online helps you prepare for online learning success by introducing you to the online learning environment and your role as a learner within it. As you come to understand yourself as an self-directed learner, you will also be introduced to effective learning strategies: time management for online learners, information management, professional communication, and reading strategies. Welcome to your online learning journey!
                        </p>
                    </Rotate>
                </div>
                <div>
                    <Fade cascade damping={0.1}>

                        <img src={banner} alt="" className='w-[1000px]'/>
                 

                          
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default Banner;

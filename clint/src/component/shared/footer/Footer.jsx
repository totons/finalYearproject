import { FaGoogle , FaGithub, FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';


const Footer = () => {
    return (
        <div className='bg-black mt-28'>
            <div className='flex items-center justify-center pt-10'>
                <div className="flex md:flex-row gap-5 items-center">
                    {/* <img src={websiteImg} alt="" className="w-32 bg-white rounded-xl" /> */}
                    <p className="font-bold text-3xl md:text-5xl text-white">Online <span className="font-bold text-orange-500">learning Academy</span></p>
                </div>
            </div>
            <div className='flex gap-3 items-center justify-center mt-10'>
                <FaFacebook className='me-2 text-white' />
                <FaGoogle className='me-2 text-white' />
                <FaGithub className='me-2 text-white' />
                <FaInstagram className='me-2 text-white' />
                <FaTwitter className='me-2 text-white' />
            </div>
            <div className='text-white flex md:flex-row flex-col items-center justify-center gap-8 mt-5'>
                <p>Advertising</p>
                <p>Terms and Condition</p>
                <p>Privacy Policy</p>
                <p>Hosted by mahmodul190120</p>
            </div>
            <div className='text-white flex md:flex-row flex-col items-center justify-center gap-5 mt-5 pb-20'>
                <p>@copyright 2023</p>
                <p>Developed by: Md Mahmodul Hasan</p>
            </div>
        </div>
    );
};

export default Footer;

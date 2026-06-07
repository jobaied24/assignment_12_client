import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../assets/doctor1.jpg'
import bannerImg2 from '../../assets/vaccination.jpg'
import bannerImg3 from '../../assets/treatment.jpg'



const Banner = () => {
    return (
        <div className='w-full h-screen overflow-hidden'>
        <Carousel
         autoPlay
         interval={5000}
         infiniteLoop={true}
         transitionTime={1000}
         swipeable={false}
         emulateTouch={false}
         stopOnHover={false}
         showIndicators={false}
         showThumbs={false}
         showStatus={false}>
            <div>
                <img src={bannerImg1} className='w-full h-screen object-cover' />
            </div>
            <div>
                <img src={bannerImg2} className='w-full h-screen object-cover' />
            </div>
            <div>
                <img src={bannerImg3} className='w-full h-screen object-cover' />
            </div>
        </Carousel>
        </div>

    );
};

export default Banner;
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../assets/doctor1.jpg'
import bannerImg2 from '../../assets/vaccination.jpg'
import bannerImg3 from '../../assets/treatment.jpg'



const Banner = () => {
    return (
        <Carousel autoPlay={true}>
            <div>
                <img src={bannerImg1} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={bannerImg2} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={bannerImg3} />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );
};

export default Banner;
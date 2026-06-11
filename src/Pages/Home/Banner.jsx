import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../assets/doctor1.jpg';
import bannerImg2 from '../../assets/vaccination.jpg';
import bannerImg3 from '../../assets/treatment.jpg';
import { Fade } from "react-awesome-reveal";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const bannerData = [
    {
        image: bannerImg1,
        title: "500+ Patients Received Free Medical Care",
        description:
            "Our community health camps have provided consultations, screenings, and medical support to hundreds of people.",
    },
    {
        image: bannerImg2,
        title: "200+ Children Vaccinated Successfully",
        description:
            "Protecting communities through vaccination programs and preventive healthcare initiatives.",
    },
    {
        image: bannerImg3,
        title: "300+ Free Health Screenings Conducted",
        description:
            "Early diagnosis and professional consultations helped improve community wellness.",
    },
];

const Banner = () => {
    return (
        <div className="w-full h-screen overflow-hidden">
            <Carousel
                autoPlay
                interval={5000}
                infiniteLoop
                transitionTime={1000}
                swipeable={false}
                emulateTouch={false}
                stopOnHover={false}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                showArrows={false}
            >
                {bannerData.map((slide, index) => (
                    <div key={index} className="relative">
                        {/* Background Image */}
                        <img
                            src={slide.image}
                            className="w-full h-screen object-cover"
                            alt={slide.title}
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* Text Content */}
                        <div className="absolute inset-0 flex items-center">

                            <div className="max-w-4xl text-left text-white px-6 md:px-16">
                                <Fade
                                    direction='up'
                                    key={index}
                                    cascade
                                    damping={0.2}
                                >
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                        {slide.title}
                                    </h1>

                                    <p className="text-lg md:text-xl mb-6">
                                        {slide.description}
                                    </p>
                                </Fade>
                            </div>

                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
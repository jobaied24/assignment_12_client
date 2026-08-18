import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { FaQuoteLeft, FaMapMarkerAlt } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "../../../Loading";

const FeedBackRatings = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: feedBackRatings = [], isLoading } = useQuery({
    queryKey: ["feedbackRating"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get("/feedbackRating");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>
  };


  return (
    <section className="mt-8 py-6 md:py-16 lg:py-20 bg-base-200 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-14">
          <h2 className="text-4xl font-bold text-primary">
            Feedback & Ratings
          </h2>

          <p className="text-gray-500 mt-4">
            Discover what participants have shared about their medical camp
            experience and the quality of healthcare services they received.
          </p>
        </div>

        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation]}
          effect="coverflow"
          centeredSlides
          slidesPerView={'auto'}
          spaceBetween={30}
          loop
       
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
        >
          {feedBackRatings.map((feedback) => (
            <SwiperSlide key={feedback._id} >
              {({ isActive }) => (
                <div
                  className={`bg-white p-6 rounded-2xl shadow-lg relative transition-all duration-300
                  ${
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-40 scale-90"
                  }`}
                >
                  {/* Quote */}
                  {/* <FaQuoteLeft className="absolute top-5 left-5 text-4xl text-primary opacity-20" /> */}

                  {/* Rating */}
                  <div className="mb-8">
                    <div className="rating rating-2xl rating-half">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={star}
                          type="radio"
                          className="mask mask-star-2 bg-yellow-400"
                          checked={feedback.rating === star}
                          readOnly
                        />
                      ))}
                    </div>
                  </div>

                  {/* Feedback */}
                  <p className="text-gray-600 leading-7 italic ">
                    "{feedback.feedback}"
                  </p>

                  <div className="border-t border-dashed mt-6 mb-2"></div>

                  {/* Footer */}
                  <div className="space-y-2">

                    <h3 className="font-bold text-secondary text-lg">
                      {feedback.participantName}
                    </h3>

                    <div className="badge badge-primary badge-outline">
                      {feedback.campName}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaMapMarkerAlt className="text-primary" />
                      {feedback.location}
                    </div>

                    <p className="text-sm text-gray-500">
                      Healthcare Professional:
                      <span className="font-medium text-secondary">
                        {" "}
                        {feedback.healthcareProfessional}
                      </span>
                    </p>

                    <p className="text-xs text-gray-400">
                      {new Date(feedback.createAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-20 mt-10">
          <button className="swiper-prev btn btn-circle btn-outline border-primary text-primary hover:bg-primary hover:text-white">
            ❮
          </button>

          <div className="swiper-pagination"></div>

          <button className="swiper-next btn btn-circle btn-outline border-primary text-primary hover:bg-primary hover:text-white">
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeedBackRatings;
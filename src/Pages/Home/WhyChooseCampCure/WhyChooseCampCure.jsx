import {
  FaUserMd,
  FaCalendarCheck,
  FaCreditCard,
  FaMapMarkedAlt,
  FaStar,
  FaChartLine,
} from "react-icons/fa";

const WhyChooseCampCure = () => {
  const features = [
    {
      id: 1,
      icon: <FaUserMd />,
      title: "Experienced Healthcare Professionals",
      description:
        "Receive quality healthcare services from experienced doctors and certified medical specialists at every camp.",
    },
    {
      id: 2,
      icon: <FaCalendarCheck />,
      title: "Simple Camp Registration",
      description:
        "Browse available medical camps and complete your registration online within minutes.",
    },
    {
      id: 3,
      icon: <FaCreditCard />,
      title: "Secure Online Payment",
      description:
        "Enjoy a safe and reliable payment experience with our secure online payment system.",
    },
    {
      id: 4,
      icon: <FaMapMarkedAlt />,
      title: "Medical Camps Nationwide",
      description:
        "Participate in healthcare camps organized across multiple cities and communities.",
    },
    {
      id: 5,
      icon: <FaStar />,
      title: "Trusted Participant Reviews",
      description:
        "Explore genuine ratings and feedback shared by participants after attending medical camps.",
    },
    {
      id: 6,
      icon: <FaChartLine />,
      title: "Personal Dashboard & Analytics",
      description:
        "Track registrations, payments, camp history, and personalized analytics from one dashboard.",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="max-w-3xl mx-auto  text-center mb-8 md:mb-14">
          <span className="text-secondary font-semibold uppercase tracking-widest">
            Why Choose Us
          </span>

          <h2 className="text-4xl font-bold text-primary mt-3">
            Why Choose CampCure
          </h2>

          <p className="text-gray-500 mt-5 leading-8">
            CampCure simplifies medical camp participation by providing
            secure registration, trusted healthcare professionals, online
            payments, participant analytics, and authentic feedback—all in
            one place.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white rounded-3xl p-8 border border-gray-100
              shadow-sm hover:shadow-xl hover:-translate-y-2
              transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center
                bg-primary/10 text-primary text-3xl
                group-hover:bg-primary group-hover:text-white
                transition-all duration-300"
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-secondary mt-6 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 leading-7">
                {feature.description}
              </p>

              {/* Bottom line */}
              <div
                className="mt-6 w-12 h-1 rounded-full bg-primary
                group-hover:w-58 transition-all duration-300"
              ></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseCampCure;
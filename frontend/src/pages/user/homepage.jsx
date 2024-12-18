import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

import Navbar from "../../components/user/navbar/navbar";
import Footer from "../../components/user/footer/footer";

// Scroll Progress Bar Component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <motion.div
      style={{ scaleX: scrollProgress / 100 }}
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500 origin-left z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
};

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out-cubic",
      once: true,
    });
  }, []);

  const productCategories = [
    {
      img: "https://wallpapers.com/images/hd/saree-pictures-2d8qt1hau3xlfjdp.jpg",
      title: "Sarees",
      description: "Explore elegant and timeless sarees for every occasion.",
      category: "Sarees",
    },
    {
      img: "https://liandli.in/cdn/shop/files/LIDG192_1_-min_800x.jpg?v=1688447887",
      title: "Girls wear",
      description: "Find stylish and comfortable wear for every young girl.",
      category: "girls' wear",
    },
    {
      img: "https://m.media-amazon.com/images/I/81eyEHAfyAL.jpg",
      title: "Boys wear",
      description: "Trendy and durable clothing for every young boy.",
      category: "boys wear",
    },
    {
      img: "https://i0.wp.com/www.ldnfashion.com/wp-content/uploads/2023/02/gen-z.jpg?fit=1499%2C1000&ssl=1",
      title: "Ganzy clothes",
      description:
        "Fresh, trendy, and fashionable clothes for the Gen Z crowd.",
      category: "ganzy clothes",
    },
    {
      img: "https://www.dfupublications.com/images/2022/08/23/Winterwear%20merchandise_large.jpg",
      title: "Winter wear",
      description:
        "Fresh, trendy, and fashionable clothes for the Gen Z crowd.",
      category: "Winter wear",
    },
    {
      img: "https://assets.ajio.com/medias/sys_master/root/20240325/JkMK/66017b9616fd2c6e6a7da6cc/-473Wx593H-467196974-maroon-MODEL.jpg",
      title: "Sleep wear",
      description:
        "Fresh, trendy, and fashionable clothes for the Gen Z crowd.",
      category: "Sleep wear",
    },
  ];

  return (
    <>
      <Helmet>
        <title>SaiFashionZone by Raiba | Unique Gifting Experience</title>
        <meta
          name="description"
          content="Discover unique gifts and thoughtful collections for every occasion."
        />
      </Helmet>
      <ScrollProgress />
   
      <div className="w-full bg-white overflow-hidden">
        {/* Product Categories Section with Refined Styling */}
        <section className="px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                Our Collections
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-md">
                Discover meticulously crafted categories designed to inspire and
                delight
              </p>
            </motion.div>

            <motion.div
              className="grid gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {productCategories.map((category, index) => (
                <Link to="/shop" key={index}>
                  <motion.div
                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-4"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={category.img}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 text-center bg-white">
                      <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                        {category.title}
                      </h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Vision Section with Modern Overlay Design */}
        <section
          className="relative min-h-[80vh] flex items-center"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.RNJBshhRJcxPoSt2Slj5bAHaEK&pid=Api&P=0&h=180"
              alt="Vision Background"
              className="w-full h-full object-cover filter brightness-50"
              loading="lazy"
            />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <motion.div
              className="bg-white/20 backdrop-blur-md border border-white/30 p-12 md:p-16 rounded-3xl max-w-2xl mx-auto text-center shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                Our Vision
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                We believe in creating more than just products – we craft
                experiences that connect hearts, celebrate relationships, and
                turn ordinary moments into extraordinary memories. Our mission
                is to be your partner in expressing love, appreciation, and
                thoughtfulness.
              </p>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 px-12 py-4 rounded-full uppercase text-sm tracking-wider font-semibold shadow-xl transition-all"
                >
                  Our Journey
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>


      </div>
    </>
  );
};

export default HomePage;

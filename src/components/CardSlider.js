import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules'; // Update this import
import './CardSlider.css';

const CardSlider = () => {
  const swiperRef = useRef(null);

  return (
    <section className="swiper mySwiper">
      <Swiper
        ref={swiperRef} 
        modules={[EffectCoverflow, Pagination]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
      >
        <SwiperSlide>
          <div className="card">
            <div className="card__image">
              <img src="/images/user1.png" alt="card image" />
            </div>
            <div className="card__content">
              <span className="card__title">Mahi</span>
              <span className="card__name">Andheri, Mumbai</span>
              <p className="card__text">
              URBANDEPOT made parking a breeze! Easy to use and the payment process is quick. Highly recommend!
              </p>
              <button className="card__btn">View More</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="card">
            <div className="card__image">
              <img src="/images/user2.png" alt="card image" />
            </div>
            <div className="card__content">
              <span className="card__title">Sakshi</span>
              <span className="card__name">Borivali, Mumbai</span>
              <p className="card__text">
              I love finding parking downtown with URBANDEPOT. Real-time availability saves me so much time!
              </p>
              <button className="card__btn">View More</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="card">
            <div className="card__image">
              <img src="/images/user3.png" alt="card image" />
            </div>
            <div className="card__content">
              <span className="card__title">Pritesh</span>
              <span className="card__name">Kandivali, Mumbai</span>
              <p className="card__text">
              URBANDEPOT is a game-changer! Reserving parking in advance is super convenient. Great support too!
              </p>
              <button className="card__btn">View More</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="card">
            <div className="card__image">
              <img src="/images/user4.png" alt="card image" />
            </div>
            <div className="card__content">
              <span className="card__title">Rakesh</span>
              <span className="card__name">Malad, Mumbai</span>
              <p className="card__text">
              As a frequent traveler, URBANDEPOT is essential. Online payments and 24/7 support are a lifesaver!
              </p>
              <button className="card__btn">View More</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

     
      <div className="swiper-buttons">
        <button className="swiper-button-left" onClick={() => swiperRef.current.swiper.slidePrev()}>
          &#10094;
        </button>
        <button className="swiper-button-right" onClick={() => swiperRef.current.swiper.slideNext()}>
          &#10095; 
        </button>
      </div>
    </section>
  );
};

export default CardSlider;
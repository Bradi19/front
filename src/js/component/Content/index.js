import React, {
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
  Suspense,
} from "react";
import { images } from "../../context/Images/content";

import { useTranslation } from "react-i18next";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import imagess from "./images";
import Block from "../Block";
import Modal from "../Modal";
import Loader from "../Loader";
// import Chat from "../Chat";
const BlockNews = React.lazy(() => import("../BlockNews"));
const BlockNext = React.lazy(() => import("../BlockNext"));
const BlockAbout = React.lazy(() => import("../BlockAbout"));
const BlockIKnow = React.lazy(() => import("../BlockIKnow"));
const BlockSubscrib = React.lazy(() => import("../BlockSubscrib"));
const Content = (props) => {
  const { t } = useTranslation();
  const [isStopSlider, setIsStopSlider] = useState(false);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [isOpenSrc, setIsOpenSrc] = useState(false);
  const [openSrc, setOpenSrc] = useState(false);
  const [dataLwo, setDataLwo] = useState("");
  const [timerStop, setTimerStop] = useState(() => {});
  const item = useRef();

  const Visible = function (target) {
    // Все позиции элемента
    let targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
      },
      // Получаем позиции окна
      windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight,
      };

    if (
      targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
      targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
      targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
      targetPosition.left < windowPosition.right
    ) {
      // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
      item.current.classList.add("active");
    } else {
    }
  };

  const changeShow = (item, activate) => {
    item.preventDefault();
    document.querySelector("html").style.overflow = "hidden";

    props.setActive(activate);
  };
  const closeModal = (e) => {
    props.setActive(e);
    document.querySelector("html").style.overflow = "auto";
  };
  const sendMassege = (data) => {
    setDataLwo(true);

    props.pageActions.sendForm(data).then((e) => {
      setDataLwo(e);
      if (e.status.success) {
        props.setActive(false);
        setDataLwo(false);

        document.querySelector("form.needs-validation").reset();
      }
      document.querySelector("html").style.overflow = "auto";
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", function () {
      Visible(item.current);
    });
    if (item.current) {
      Visible(item.current);
    }
    moveSlider();
  }, []);
  const stopSlider = (e) => {
    setOpenSrc(e.target.dataset.trans);
    if (isStopSlider) {
      moveSlider();
      setIsStopSlider(false);
      setIsOpenTooltip(false);
      setIsOpenSrc(false);
      setOpenSrc(false);
      return;
    }
    setIsOpenSrc(true);
    setIsOpenTooltip(true);
    clearInterval(timerStop);
    setIsStopSlider(true);
  };
  const moveSlider = () => {
    var picsNum = document.getElementsByClassName("slide").length,
      slider = document.querySelector(".slider"),
      slide = document.querySelectorAll(".slide"),
      startHeight = slider.offsetHeight,
      oneHeight = startHeight / picsNum,
      sliderOffset = 0,
      slidea = 0;
    setTimerStop(
      setInterval(() => {
        sliderOffset += oneHeight;
        var first = slide[slidea],
          second = slide[slidea + 1];
        first.style = null;
        if (!second) {
          second = slide[1];
        }
        second.classList.add("active");
        slider.style.zIndex = "-1";

        setTimeout(() => {
          first.style.transform = "scale(0.05)";
        }, 500);
        setTimeout(() => {
          first.classList.add("hidden");
          slider.style.zIndex = "0";
        }, 700);
        setTimeout(() => {
          first.style.transition = "all 0.5s linear 1s";
          first.style.transform = "scale(1)";
          first.classList.remove("hidden");
          first.classList.remove("active");
          first.remove();
          slider.append(first);
        }, 800);
        slidea++;
        if (slidea >= picsNum) {
          slidea = 0;
        }
      }, 1500)
    );
  };
  return (
    <div className="blocksection">
      <section className="hero-section set-bg" data-setbg={images.Hero}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div ref={item} className="hero-text">
                <span>{props.data.data ? t(props.data.data[0].body) : ""}</span>
                <h2></h2>
                <a href="#portfolio" className="primary-btn">
                  {props.data.data ? t(props.data.data[0].title) : ""}
                </a>
              </div>
            </div>
            <div className="col-lg-3 position-relative ">
              <div
                className={isOpenTooltip ? "showTooltip active" : "showTooltip"}
              >
                <div className="block">
                  <div className="block_text">
                    <span>
                      {!openSrc
                        ? t("tooltip.about")
                        : t(`tooltip.about.${openSrc}`)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 position-relative">
              <div
                className="slider_vert"
                onMouseMove={() => setIsOpenTooltip(true)}
                onMouseLeave={() => !isOpenSrc && setIsOpenTooltip(false)}
              >
                <div className="seeScreen">
                  <div className="slider">
                    {Object.entries(imagess).map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="slide"
                          onClick={(ed) => stopSlider(ed)}
                        >
                          <img data-trans={e[0]} src={e[1]} alt={e[0]} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <img src={images.HeroRight} alt="" />
            </div>
          </div>
        </div>
      </section>
      {/* {props.projects.data && (<Chat infoUser={props.infoUser} takeIp={() => props.pageActions.takeIp()} />)} */}
      <Block props={props} />
      <Suspense fallback={<Loader />}>
        {props.projects.data && (
          <BlockNews
            images={images}
            projectOne={(e) => props.pageActions.projectOne(e)}
            project={props.project}
            projects={props.projects.data}
          />
        )}
      </Suspense>
      <Suspense fallback={<Loader />}>
        <BlockNext images={images} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <BlockAbout
          images={images}
          active={(item, activate) => changeShow(item, activate)}
        />
      </Suspense>
      <GoogleReCaptchaProvider
        reCaptchaKey="6LdZ5cceAAAAANlRyAE5m-6KQ6rfdmZqBGIqei2t"
        scriptProps={{
          async: true, // optional, default to false,
          defer: true, // optional, default to false
          appendTo: "body", // optional, default to "head", can be "head" or "body",
          nonce: undefined, // optional, default undefined
        }}
      >
        <Modal
          dataLwo={dataLwo}
          active={props.active}
          closer={(e) => closeModal(e)}
          send={(data) => sendMassege(data)}
          data={dataLwo.status}
        />
      </GoogleReCaptchaProvider>

      <Suspense fallback={<Loader />}>
        <BlockIKnow images={images} data={props.news.data} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <BlockSubscrib
          images={images}
          send={(data) => sendMassege(data)}
          active={props.active}
          closer={(e) => closeModal(e)}
          dataLwo={dataLwo}
        />
      </Suspense>
    </div>
  );
};

export default Content;

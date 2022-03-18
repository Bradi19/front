import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
const Block = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      // конечная дата
      secondMin();
    });
    secondMin();
  }, []);
  const secondMin = () => {
    let start = 8,
      end = 20,
      today = new Date(),
      result = Math.ceil(end - today.getHours());
    if (result <= 0 || result > 12){
      start = today.getHours()
    }else{
      start =Math.ceil(today.getHours()+result);
    }
    const deadline = new Date(today.getFullYear(),today.getMonth(),today.getDate(), start);
    // id таймера
    let timerId = null;
    // склонение числительных
    const declensionNum = (num, words) => {
      return words[
        num % 100 > 4 && num % 100 < 20
          ? 2
          : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
      ];
    };
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    const countdownTimer = () => {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $days.innerHTML = `<span>${days < 10 ? "0" + days : days}</span>`;
      $hours.innerHTML = `<span>${hours < 10 ? "0" + hours : hours}</span>`;
      $minutes.innerHTML = `<span>${
        minutes < 10 ? "0" + minutes : minutes
      }</span>`;
      $seconds.innerHTML = `<span>${
        seconds < 10 ? "0" + seconds : seconds
      }</span>`;
      $days.innerHTML += `<p>${declensionNum(days, [
        t("timers.day0"),
        t("timers.day1"),
        t("timers.day2"),
      ])}</p>`;
      $hours.innerHTML += `<p>${declensionNum(hours, [
        t("timers.time0"),
        t("timers.time1"),
        t("timers.time2"),
      ])}</p>`;
      $minutes.innerHTML += `<p>${declensionNum(minutes, [
        t("timers.min0"),
        t("timers.min1"),
        t("timers.min2"),
      ])}</p>`;
      $seconds.innerHTML += `<p>${declensionNum(seconds, [
        t("timers.sec0"),
        t("timers.sec1"),
        t("timers.sec2"),
      ])}</p>`;
    };
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelector(".timer__days");
    const $hours = document.querySelector(".timer__hours");
    const $minutes = document.querySelector(".timer__minutes");
    const $seconds = document.querySelector(".timer__seconds");
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
  };
  const timout = () => {
    return (
      <div className="col-lg-8">
        <div className="cd-timer" id="countdown">
          <div className="cd-item timer__days"></div>
          <div className="cd-item timer__hours"></div>
          <div className="cd-item timer__minutes"></div>
          <div className="cd-item timer__seconds"></div>
        </div>
      </div>
    );
  };
  return (
    <section className="counter-section bg-gradient">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="counter-text">
              <span>{t("timers.title")}</span>
              <h3>{t("timers.description")}</h3>
            </div>
          </div>
          {timout()}
        </div>
      </div>
    </section>
  );
};

export default Block;

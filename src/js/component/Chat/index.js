import { t } from "i18next";
import React, { useEffect, useState } from "react";
import sender from "../../../img/send.svg";
const dataDomain = require("../../context/tld-list-basic.json");
const Chat = (props) => {
  let ws = null;
  const [uname, setUname] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    props.takeIp();
    return () => {};
    // ws = connect();
  }, []);
  const connect = () => {
    // Создание подключения к веб-сокету  ws://ip:Номер порта
    ws = new WebSocket("ws://127.0.0.1:3000");

    ws.onopen = onopen;
    ws.onmessage = onmessage;
    ws.onclose = onclose;
    ws.onerror = onerror;
    return ws;
  };
  const onopen = () => {
    var data = "Системное сообщение: соединение установлено успешно";
  };
  const onmessage = (e) => {
    var data = JSON.parse(e.data),
      uname = "",
      headerimg = "";

    switch (data.type) {
      case "handShake":
        // Первый вход, отправка данных для входа
        var user_info = { type: "login", msg: uname, headerimg: headerimg };
        sendMsg(user_info);
        break;
      case "login":
        userList(data.user_list);
        systemMessage(t("chat.online"));
        break;
      case "logout":
        userList(data.user_list);
        if (data.msg.length > 0) {
          systemMessage(t("chat.offline"));
        }
        break;
      case "user":
        messageList(data);
        break;
      case "system":
        systemMessage();
        break;
    }
  };
  const onclose = () => {
    console.log("Соединение закрыто, регулярно подключайтесь повторно");
  };
  const onClick = () => {
    console.log(props);
  };
  // событие ошибки websocket
  const onerror = () => {
    var data =
      "Системное сообщение: что-то пошло не так, выйдите и попробуйте еще раз";
    connect();
  };
  const checkDomain = (items) => {
    let f = -1;
    dataDomain.find((el) => {
      if (items.indexOf(el) >= 0) {
        f = items.indexOf(el);
        return f;
      }
    });
    return f;
  };
  const confirm = (event) => {
    var key_num = event.keyCode,
      value = event.target.value,
      tooltip = document.querySelector(".textarea-tooltip"),
      links = document.querySelectorAll(".write>a"),
      regex = new RegExp(
        /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{1,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi
      );
    if (event.target.scrollHeight <= 90) {
      setTimeout(function () {
        event.target.style.cssText =
          "height:" + parseInt(event.target.scrollHeight) + "px";
      }, 1);
    }

    if (value.length > 500) {
      tooltip.classList.add("error");
      event.target.classList.add("error");
      event.target.style.cssText = "height:86px";
      tooltip.innerHTML = "<span>" + t("chat.errorTooLongTextarea") + "</span>";
      event.target.value = value.substr(0, 500);
      return;
    }
    if (value && value.match(regex) !== null) {
      tooltip.classList.add("error");
      event.target.classList.add("error");
      tooltip.innerHTML = "<span>" + t("chat.errorTextarea") + "</span>";
      links.forEach((link) => {
        link.classList.add("disabled-link");
      });
      return;
    }
    if (
      event.target.classList.contains("error") ||
      tooltip.classList.contains("error")
    ) {
      tooltip.classList.remove("error");
      event.target.classList.remove("error");
      links.forEach((link) => {
        link.classList.remove("disabled-link");
      });
      tooltip.innerHTML = "";
    }
    if (13 == key_num) {
      send();
    } else {
      return false;
    }
  };

  // отправляем данные
  const send = (e) => {
    e.preventDefault();
    var msg = document.querySelector("textarea#input-value").value;
    var reg = new RegExp("\r\n", "g"),
      tooltip = document.querySelector(".textarea-tooltip"),
      links = document.querySelectorAll(".write>a");
    if (checkDomain(msg) >= 0) {
      tooltip.classList.add("error");
      tooltip.innerHTML = "<span>" + t("chat.errorTextarea") + "</span>";
      links.forEach((link) => {
        link.classList.add("disabled-link");
      });
      return;
    }
    msg = msg.replace(reg, "");
    sendMsg({ type: "user", msg: msg });
    document.querySelector("textarea#input-value").value = "";
  };

  // отправляем данные
  const sendMsg = (msg) => {
    var data = JSON.stringify(msg);
    if (ws === null) {
      ws = connect();
    } else {
      ws.send(data);
    }
  };

  // Дополнительные данные, системные сообщения онлайн и офлайн
  const systemMessage = (msg) => {
    var html =
      `<div class="conversation-start">
               <span>` +
      msg +
      `</span>
               </div>`;
    var active_chat = document.querySelector("div.active-chat");
    var oldHtml = active_chat.innerHTML;
    active_chat.innerHTML = oldHtml + html;
    active_chat.scrollTop = active_chat.scrollHeight;
  };

  // Добавляем данные, полученные с сервера Список онлайн-людей слева
  const userList = (user) => {
    var html = "";
    for (var i = 0; i < user.length; i++) {
      html +=
        `<li class="person" data-chat="person1">
               <img src="` +
        user[i].headerimg +
        `" alt=""/>
               <span class="name">` +
        user[i].username +
        `</span>
               <span class="time">` +
        user[i].login_time +
        `</span>
               <span class="preview"></span>
               </li>`;
    }
    document.querySelector("ul.people").innerHTML = html;
    document.querySelector("span#numbers").innerHTML = user.length;
  };

  // Список истории чата справа
  const messageList = (data) => {
    // Определяем, отправлено ли это сообщение самостоятельно, соответствующий стиль отличается
    if (data.from == uname) {
      // Если текущее имя пользователя совпадает с именем пользователя feom, это означает сообщение, отправленное вами
      var html =
        `<div class="message">
                   <div class="bubble me">` +
        data.msg +
        `</div><div class="image"><img class="me-header" src="` +
        data.headerimg +
        `" alt=""/></div>
                   </div>`;
    } else {
      // Список сообщений, отправленных другими
      var html =
        `<div class="message">
                   <img src="` +
        data.headerimg +
        `" alt=""/>
                   <div class="bubble you">` +
        data.msg +
        `</div>
                   </div>`;
    }
    var active_chat = document.querySelector("div.active-chat");
    var oldHtml = active_chat.innerHTML;
    active_chat.innerHTML = oldHtml + html;
    active_chat.scrollTop = active_chat.scrollHeight;
  };
  const uuid = (len, radix) => {
    var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
    var uuid = [],
      i;
    radix = radix || chars.length;

    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      var r;

      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";

      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join("");
  };
  return (
    <>
      <div className="left">
        <div className="top" onClick={() => onClick()}>
          <div className="">
            Люди в сети: <span id="numbers"> 0 </span> человек
          </div>
        </div>
      </div>
      <div className="wrapper-chat ">
        <div className="signIn">
          <div className="input">
            <label>{t("chat.login")} </label>
            <input type="text" className="form-control" name="login" value="" />
          </div>
          <button className="form-control" name="login" value="">
            {t("chat.send")}
          </button>
        </div>
        <div className="container chat">
          <div className="right">
            <div className="top">
              <span>
                {t("chat.title")}
                <br />
                <span className="name">{t("chat.description")}</span>
              </span>
            </div>
            | {t("chat.spisok")} <ul className="people"></ul>
            <div className="chat-line active-chat" data-chat="person1"></div>
            <div className="write">
              <a href="#" className="write-link attach"></a>
              <div
                className="textarea-tooltip"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
              ></div>
              <textarea
                rows="3"
                type="text"
                id="input-value"
                onKeyDown={(event) => confirm(event)}
                className="form-control"
                placeholder={t("chat.placeholder")}
              ></textarea>

              <a href="#" className="write-link smiley">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  className="bi bi-emoji-smile"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                </svg>
              </a>
              <a href="#" className="write-link send" onClick={(e) => send(e)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="160"
                  height="160"
                  fill="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;

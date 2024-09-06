import icon_check from "assets/images/icon-check.png";
import { ROUTES } from "constants/routerWeb";
import React from "react";
import { Link } from "react-router-dom";
import "./widget.scss";

const listWidget = [
  {
    title: "Topics",
    options: [
      {
        label: "Video",
        link: ROUTES.TOPIC + "#video",
      },
      {
        label: "Content",
        link: ROUTES.TOPIC + "#content",
      },
    ],
  },
  {
    title: "Quizs",
    options: [
      {
        label: "Essay",
        link: ROUTES.QUIZ,
      },
      {
        label: "Multiple-Choice",
        link: ROUTES.QUIZ,
      },
    ],
  },
  {
    title: "History quizs",
    options: [
      {
        label: "History",
        link: ROUTES.USER_DETAIL,
      },
    ],
  },
];

function Widget() {
  return (
    <div className="position-sticky top-0">
      {listWidget.map((widget, index) => (
        <div className="box-widget p-4 mb-4 " key={index}>
          <h3 className="title">{widget.title}</h3>
          <ul className="option-widget p-0">
            {widget.options.map((item, idx) => (
              <li className="d-flex align-items-center mt-2" key={idx}>
                <img
                  src={icon_check}
                  alt="icon check"
                  width={12}
                  height={10}
                  className="me-2"
                />
                <Link className="fs-5 text" to={item.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Widget;

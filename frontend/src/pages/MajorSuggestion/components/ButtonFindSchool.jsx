import "./ButtonFindSchool.css";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ButtonFindSchool = (prop) => {
  const majors = prop.prop.map((item) => item.name);
  let url = "/find-school?majorName=";
  majors.forEach((element) => {
    url = url + element + ",";
  });

  return (
    <>
      <button className="btnFindSchool">
        <ClockCircleOutlined />
        <Link to={url} style={{ marginLeft: 10, color: "#ffff" }}>
          Tìm trường
        </Link>
      </button>
    </>
  );
};

export default ButtonFindSchool;

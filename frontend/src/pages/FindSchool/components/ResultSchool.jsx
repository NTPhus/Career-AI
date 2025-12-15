import { Table, ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import "./ResultSchool.css";
import ButtonAI from "./buttonAI";

const ResultSchool = (prop) => {
  const [schools, setSchools] = useState([]);
  const [flatData, setFlatData] = useState([]); // State mới cho dữ liệu đã phẳng hóa

  // 1. Hàm để phẳng hóa dữ liệu
  const flattenData = (schoolsData) => {
    return schoolsData.flatMap((school) => {
      if (!school.majors || school.majors.length === 0) {
        return [
          {
            key: school.name,
            schoolName: school.name,
            majorName: "Không có ngành học", // Hoặc để trống
            admission_reference: school.admission_reference,
            tuition_fee_link: school.tuition_fee_link,
            // Các trường thông tin khác để null/undefined
            major: null,
          },
        ];
      }
      // console.log(schoolsData);
      // Tạo một đối tượng mới cho mỗi ngành học, kết hợp với thông tin của trường
      return school.majors.map((major, majorIdx) => ({
        // Tạo key duy nhất bằng cách kết hợp school ID/Name và major index
        key: `${school.name}-${majorIdx}`,
        schoolName: school.name,
        majorName: major.name,
        admission_reference: school.admission_reference,
        tuition_fee_link: school.tuition_fee_link,
        major: major,
      }));
    });
  };

  useEffect(() => {
    setSchools(prop.prop);
    setFlatData(flattenData(prop.prop));
  }, [JSON.stringify(prop.prop)]);

  const columns = [
    {
      title: "Tên trường",
      dataIndex: "schoolName",
      key: "schoolName",
      render: (text, record) => {
        return (
          <div>
            <div
              style={{ color: "#FACC15", fontWeight: 600, marginBottom: 10 }}
            >
              {text}
            </div>
            {<ButtonAI prop={record} />}
          </div>
        );
      },
    },
    {
      title: "Tên ngành",
      dataIndex: "majorName",
      key: "majorName",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Điểm THPT 2025",
      key: "thpt",
      render: (_, record) => {
        const thpt = record.major?.admissions.thpt;
        const combinations = record.major?.combinations || [];
        return (
          <div>
            <div key="score">{thpt?.score ?? "-"}/30</div>
            {thpt?.score &&
              combinations.map((item, index) => (
                <span style={{ marginLeft: 5 }} key={index}>
                  {item}
                </span>
              ))}
          </div>
        );
      },
    },
    {
      title: "Điểm học bạ 2025",
      key: "hoc_ba",
      render: (_, record) => {
        const hoc_ba = record.major?.admissions.hoc_ba;
        const combinations = record.major?.combinations || [];
        return (
          <div>
            <div key="score">{hoc_ba?.score ?? "-"}/30</div>
            {hoc_ba?.score &&
              combinations.map((item, index) => (
                <span style={{ marginLeft: 5 }} key={index}>
                  {item}
                </span>
              ))}
          </div>
        );
      },
    },
    {
      title: "Điểm ĐGNL 2025",
      key: "dgnl",
      render: (_, record) => {
        const dgnl = record.major?.admissions.dgnl;
        return (
          <div>
            <div key="score">{dgnl?.score ?? "-"}</div>
            <div>{dgnl?.localtion ?? "-"}</div>
          </div>
        );
      },
    },
    {
      title: "Đề án tuyển sinh",
      dataIndex: "admission_reference",
      key: "admission_reference",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          Ấn để xem
        </a>
      ),
    },
    {
      title: "Chi tiết học phí",
      dataIndex: "tuition_fee_link",
      key: "tuition_fee_link",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          Ấn để xem
        </a>
      ),
    },
  ];

  return (
    <>
      <div className="tbresult__container">
        <h2 className="result_title">Kết quả tìm kiếm</h2>

        <Table
          className="tbresult_school"
          dataSource={flatData}
          columns={columns}
        ></Table>
      </div>
    </>
  );
};

export default ResultSchool;

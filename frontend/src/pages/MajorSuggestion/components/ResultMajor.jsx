import React, { useState, useEffect } from "react";
import { Card, Modal } from "antd";
import "./ResultMajor.css";
import { getDescFromAI } from "../../../services/aiService";
import { searchMajor } from "../../../services/majorService";
import { getEmbedUrl } from "../../../utils/embedLink";
import ButtonFindSchool from "./ButtonFindSchool";

const ResultMajor = ({ prop, character }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [desc, setDesc] = useState("Loading...");
  const [major, setMajor] = useState([]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  //  Load danh sách ngành
  useEffect(() => {
    const findMajor = async () => {
      try {
        const res = await searchMajor(prop);
        setMajor(res);
      } catch (error) {
        console.error("Lỗi searchMajor:", error);
      }
    };

    findMajor();
  }, [prop]);

  //  Load mô tả ngành (AI) + cache sessionStorage
  useEffect(() => {
    const loadDesc = async () => {
      try {
        const descSession = sessionStorage.getItem(prop.major);

        if (descSession) {
          setDesc(descSession);
        } else {
          const res = await getDescFromAI(prop.major, character);
          setDesc(res.reply);
          sessionStorage.setItem(prop.major, res.reply);
        }
      } catch (error) {
        console.error("Lỗi getDescFromAI:", error);
        setDesc("Không thể tải mô tả ngành.");
      }
    };

    loadDesc();
  }, [prop.major, character]);

  return (
    <>
      <Card
        className="result__major--item"
        title={prop.major}
        variant="borderless"
      >
        <p style={{ marginTop: -5 }}>Nhóm ngành: {prop.field}</p>
        <button className="btn__major" onClick={showModal}>
          Xem thêm
        </button>
      </Card>

      <Modal
        width={800}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closable={{ "aria-label": "Custom Close Button" }}
        styles={{
          content: { backgroundColor: "#1E1E1E" },
          header: { backgroundColor: "#1E1E1E", borderBottom: "none" },
          body: { backgroundColor: "#1E1E1E", color: "#fff" },
          footer: { backgroundColor: "#1E1E1E", borderTop: "none" },
        }}
      >
        <h2 style={{ marginTop: -5, color: "#EAB308" }}>
          {prop.major}
        </h2>

        {/* Video giới thiệu */}
        {major.length > 0 && major[0].video_links && (
          <iframe
            width="100%"
            height="300"
            src={getEmbedUrl(major[0].video_links)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {/* Danh sách ngành */}
        {major.length > 0 && (
          <>
            <h4>Các ngành tiêu biểu</h4>
            {major.map((item) => (
              <p key={item._id}>- {item.name}</p>
            ))}
          </>
        )}

        {/* Mô tả AI */}
        <p>{desc}</p>

        <ButtonFindSchool prop={major} />
      </Modal>
    </>
  );
};

export default ResultMajor;

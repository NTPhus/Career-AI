import React, { useState, useEffect } from "react";
import { Card, Modal } from "antd";
import "./ResultMajor.css";
import { getDescFromAI } from "../../../services/aiService";
import { searchMajor } from "../../../services/majorService";
import { getEmbedUrl } from "../../../utils/embedLink";
const ResultMajor = (prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [desc, setDesc] = useState("Loading...");
  const [major, setMajor] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchDesc = async () => {
      const res = await getDescFromAI(prop.prop.major);
      setDesc(res.reply);
      console.log("API response:", res);
    };

    fetchDesc();
  }, []);

  useEffect(() => {
    const findMajor = async () => {
      const res = await searchMajor(prop);
      console.log("API response:", res);
      setMajor(res);
    };

    findMajor();
  }, []);

  return (
    <>
      <Card
        className="result__major--item"
        title={prop.prop.major}
        variant="borderless"
      >
        <p style={{ marginTop: -5 }}>Nhóm ngành: {prop.prop.field}</p>
        <button className="btn__major" onClick={showModal}>
          Xem thêm
        </button>
      </Card>
      <Modal
        width={800}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        styles={{
          content: { backgroundColor: "#1E1E1E" }, // toàn khối modal
          header: { backgroundColor: "#1E1E1E", borderBottom: "none" },
          body: { backgroundColor: "#1E1E1E", color: "#ffff" },
          footer: { backgroundColor: "#1E1E1E", borderTop: "none" },
        }}
      >
        <h2 style={{ marginTop: -5, color: "#EAB308" }}>{prop.prop.major}</h2>
        {major.length > 0 ? <>
          <iframe
            width="100%"
            height="300"
            src={getEmbedUrl(major[0].video_links)}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </>: <></>}
       
        <h4>
          {major.length > 0 ? (
            <>
              <p>Các ngành tiêu biểu</p>
              {major.map((item) => (
                <p> - {item.name}</p>
              ))}
            </>
          ) : (
            ""
          )}
        </h4>
        {desc || <p>"Loading...."</p>}
      </Modal>
    </>
  );
};

export default ResultMajor;

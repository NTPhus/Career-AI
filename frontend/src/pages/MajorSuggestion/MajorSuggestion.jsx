import { Row, Col, Table, Form, Select, Button, message } from "antd";
import "./MajorSuggestion.css";
import ResultMajor from "./components/ResultMajor";
import { useEffect, useState, useMemo } from "react";
import { getQuestion } from "../../services/questionServer";
import { predictMajor } from "../../services/majorService";

const MajorSuggestion = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // trang hiện tại
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: answer }
  const [majors, setMajors] = useState([]);
  const [character, setCharacter] = useState([]);
  const [check, setCheck] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const pageSize = 8;
  const majorSession = JSON.parse(sessionStorage.getItem("major_prediction"));

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await getQuestion();
      setQuestions(res);
      // console.log(res);
    };
    fetchQuestion();
  }, []);

  // Tổng số trang
  const totalPages = useMemo(
    () => (questions.length ? Math.ceil(questions.length / pageSize) : 1),
    [questions, pageSize]
  );

  // Câu hỏi của trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const pageQuestions = questions.slice(startIndex, startIndex + pageSize);

  const columns = [
    {
      title: <span className="header-question">Câu hỏi</span>,
      dataIndex: "question",
      key: "question",
    },
    {
      title: <span className="header-answer">Câu trả lời</span>,
      dataIndex: "answers",
      key: "answers",
      render: (answers, record) => (
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn câu trả lời"
          value={selectedAnswers[record.id]}
          onChange={(value) => {
            setSelectedAnswers((prev) => ({
              ...prev,
              [record.id]: value, // lưu theo id câu hỏi
            }));
          }}
          options={answers.map((ans) => ({
            label: ans,
            value: ans,
          }))}
        />
      ),
    },
  ];

  const handleSubmit = async () => {
    const total = questions.length;
    const answered = Object.keys(selectedAnswers).length;

    if (answered < total) {
      messageApi.open({
        type: "error",
        content:
          `Bạn còn ${total - answered} câu chưa trả lời!`,
        duration: 5,
      });
    }

    const labelToValueRIASEC = {
      "Hoàn toàn không đồng ý": 1,
      "Không đồng ý": 2,
      "Trung lập": 3,
      "Đồng ý": 4,
      "Hoàn toàn đồng ý": 5,
      Nam: 1,
      Nữ: 2,
      Khác: 3,
      "Nông thôn": 1,
      "Ngoại ô": 2,
      "Thành thị": 3,
    };

    const labelToValueTIPI = {
      "Hoàn toàn không đồng ý": 1,
      "Không đồng ý": 2,
      "Hơi không đồng ý": 3,
      "Trung lập": 4,
      "Hơi đồng ý": 5,
      "Đồng ý": 6,
      "Hoàn toàn đồng ý": 7,
    };

    const result = questions.map((q) => ({
      question: q.titleGroup,
      answer: q.titleGroup.includes("TIPI")
        ? labelToValueTIPI[selectedAnswers[q.id]]
        : labelToValueRIASEC[selectedAnswers[q.id]],
    }));

    const mapped = {};
    result.forEach((item) => {
      mapped[item.question] = item.answer;
    });

    // const test = {
    //   R1: 3,
    //   R2: 2,
    //   R3: 2,
    //   R4: 3,
    //   R5: 3,
    //   R6: 2,
    //   R7: 3,
    //   R8: 2,
    //   I1: 3,
    //   I2: 2,
    //   I3: 2,
    //   I4: 3,
    //   I5: 2,
    //   I6: 2,
    //   I7: 2,
    //   I8: 2,
    //   A1: 2,
    //   A2: 2,
    //   A3: 3,
    //   A4: 2,
    //   A5: 2,
    //   A6: 2,
    //   A7: 2,
    //   A8: 2,
    //   S1: 4,
    //   S2: 5,
    //   S3: 5,
    //   S4: 5,
    //   S5: 5,
    //   S6: 5,
    //   S7: 5,
    //   S8: 5,
    //   E1: 4,
    //   E2: 5,
    //   E3: 5,
    //   E4: 2,
    //   E5: 5,
    //   E6: 5,
    //   E7: 5,
    //   E8: 3,
    //   C1: 3,
    //   C2: 4,
    //   C3: 5,
    //   C4: 5,
    //   C5: 3,
    //   C6: 3,
    //   C7: 5,
    //   C8: 3,
    //   TIPI1: 6,
    //   TIPI2: 4,
    //   TIPI3: 7,
    //   TIPI4: 7,
    //   TIPI5: 6,
    //   TIPI6: 6,
    //   TIPI7: 6,
    //   TIPI8: 5,
    //   TIPI9: 5,
    //   TIPI10: 4,
    //   urban: 3,
    //   gender: 2,
    // };

    const res = await predictMajor(mapped);

    console.log(res);

    setMajors(res.predict);
    setCharacter(res.top3);
    setCheck(true);

    sessionStorage.setItem("major_prediction", JSON.stringify(res.predict));
    sessionStorage.setItem("major_character", JSON.stringify(res.top3));

    messageApi.open({
      type: "success",
      content: "Bạn đã hoàn tất bài khảo sát- Vui lòng xem kết quả bên dưới!",
      duration: 5,
    });
  };

  useEffect(() => {
    if (majorSession) {
      const character = JSON.parse(sessionStorage.getItem("major_character"));
      setMajors(majorSession);
      setCharacter(character);
      setCheck(true);
      // console.log(majorSession);
    }
  }, majorSession);

  const ClearSession = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {contextHolder}
      <Row className="major_suggestion">
        <Col span={2}></Col>
        <Col span={6} style={{ marginTop: "15%", marginLeft: 60 }}>
          <h1 style={{ color: "white" }}>Gợi ý ngành</h1>
          <p className="text_find_school">Chọn đáp án cho những câu hỏi</p>
          <p style={{ marginLeft: 30 }} className="text_find_school">
            để chúng mình hiểu nhau hơn
          </p>
        </Col>

        {/* Start Bảng câu hỏi */}
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 60,
          }}
        >
          <Form
            layout="vertical"
            className="question-form"
            onFinish={handleSubmit}
          >
            <Row className="form_item_school" gutter={16}>
              <Table
                size="small"
                rowKey="id"
                columns={columns}
                dataSource={pageQuestions} // chỉ 8 câu trên trang hiện tại
                pagination={false} // tắt pagination mặc định
                title={() => {
                  if (!pageQuestions.length) return null;
                  const group = pageQuestions[0]?.group;
                  return (
                    <div
                      style={{
                        background: "#F7D736",
                        padding: "12px 16px",
                        fontWeight: "700",
                        fontSize: "18px",
                        borderRadius: "6px 6px 0 0",
                      }}
                    >
                      {group || "Nhóm câu hỏi"}
                    </div>
                  );
                }}
              />
            </Row>

            {/* Pagination custom: Trước / Tiếp */}
            <div className="custom-pagination">
              <Button
                className="btn__custom-pagination"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Quay lại
              </Button>

              <Button
                className="btn__custom-pagination"
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                }}
                disabled={currentPage === totalPages}
              >
                Tiếp theo
              </Button>

              <Button
                htmlType="submit"
                className="btn__custom-pagination"
                disabled={currentPage !== totalPages}
              >
                Gợi ý
              </Button>
            </div>
          </Form>
        </Col>
        {/* End Bảng câu hỏi */}
      </Row>

      {/* Kết quả gợi ý ngành */}
      {check && (
        <div className="result__content">
          <div style={{ marginLeft: 65 }}>
            <h2 style={{ color: "#EAB308" }}>Ngành nghề phù hợp</h2>
            <p style={{ color: "black" }}>
              Sau khi phân tích hệ thống thấy bạn có nhiều tiềm năng để thành công khi lựa chọn các ngành nghề dưới đây...
            </p>
          </div>

          <Row gutter={[16, 16]}>
            {majors.length > 0 ? (
              majors.map((m) => (
                <Col key={m.major}>
                  <ResultMajor prop={m} character={character} />
                </Col>
              ))
            ) : (
              <p>Xem thêm</p>
            )}
          </Row>
        </div>
      )}
      {majors.length > 0 ? (
        <>
          <div className="div_reset" onClick={ClearSession}>
            <button className="btn__reset">Làm lại trắc nghiệm</button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MajorSuggestion;

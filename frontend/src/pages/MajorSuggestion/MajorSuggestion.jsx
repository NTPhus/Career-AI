import { Row, Col, Table, Form, Select, Button } from 'antd';
import "./MajorSuggestion.css";
import ResultMajor from './components/ResultMajor';
import { useEffect, useState, useMemo } from 'react';
import { getQuestion } from '../../services/questionServer';

const MajorSuggestion = () => {
  const [questions, setQuestions] = useState([]);          
  const [currentPage, setCurrentPage] = useState(1);       // trang hiện tại
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: answer }
  const pageSize = 8;


  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await getQuestion();   
      setQuestions(res);
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
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: <span className="header-answer">Câu trả lời</span>,
      dataIndex: 'answers',
      key: 'answers',
      render: (answers, record) => (
        <Select
          style={{ width: '100%' }}
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

  return (
    <>
      <Row className="major_suggestion">
        <Col span={2}></Col>
        <Col span={6} style={{ marginTop: "15%" , marginLeft:60}}>
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
          <Form layout="vertical" className="question-form">
            <Row className="form_item_school" gutter={16}>
              <Table
                size="small"
                rowKey="id"
                columns={columns}
                dataSource={pageQuestions}   // chỉ 8 câu trên trang hiện tại
                pagination={false}           // tắt pagination mặc định
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
              <button className='btn__custom-pagination'
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
              >
                Quay lại
              </button>


              <button className='btn__custom-pagination'
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Tiếp theo
              </button>
            </div>
          </Form>
        </Col>
        {/* End Bảng câu hỏi */}
      </Row>



      {/* Kết quả gợi ý ngành */}
      <div className="result__content">
        <div style={{ marginLeft: 100 }}>
          <h2 style={{ color: "#EAB308" }}>Ngành nghề phù hợp</h2>
          <p>Sau khi phân tích hệ thống thấy bạn có nhiều tiềm năng...</p>
        </div>

        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6}>
            <ResultMajor />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MajorSuggestion;

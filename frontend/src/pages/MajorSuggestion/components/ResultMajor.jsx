import React, { useState } from 'react'
import { Card, Modal } from 'antd';
import "./ResultMajor.css"
const ResultMajor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Card className='result__major--item' title="Tên ngành...." variant="borderless" >
                <p style={{ marginTop: -5 }}>Mô tả ngành...</p>
                <button className='btn__major' onClick={showModal}>Xem thêm</button>
            </Card>
            <Modal
                width={800}
                closable={{ 'aria-label': 'Custom Close Button' }}
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
                <h2 style={{ marginTop: -5, color: "#EAB308" }}>Tên ngành...</h2>
                <iframe
                    width="100%"
                    height="300"
                    src="https://www.youtube.com/embed/kR_5N66-Dm4"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                <h4>Lý do chọn ngành...</h4>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, repellendus possimus? Facilis quo aliquid nihil autem minima ullam obcaecati non, fugit, cum blanditiis animi voluptates, maxime rerum fugiat error exercitationem.
                    Nulla officia dolorem earum quis. Ad modi sed odio quas cum nemo, fuga impedit reiciendis quod, itaque suscipit eveniet? Ratione, laborum. Atque minus quos laborum autem ratione adipisci a modi.
                    Vel, accusantium ipsa eaque consequatur perferendis id commodi similique maiores quia inventore at obcaecati architecto veniam assumenda eveniet nostrum accusamus in corrupti quos animi error ad? Odio, dolorum. Facilis, aspernatur!
                    Magnam nemo dignissimos quas non. Quo atque accusamus explicabo culpa, quaerat sint nam, quasi, error quas dicta aspernatur consequuntur deserunt corporis veniam iste nesciunt asperiores ex. Officiis expedita suscipit quae.
                    Nulla, minus alias esse repellendus vitae distinctio perspiciatis nisi iusto harum error consectetur voluptate debitis delectus laborum fugiat itaque sequi. Cupiditate reiciendis magnam, illum iste quidem suscipit praesentium atque aliquid.</p>
            </Modal>
        </>
    )
}

export default ResultMajor
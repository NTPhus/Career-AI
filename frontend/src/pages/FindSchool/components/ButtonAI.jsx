import "./ButtonAI.css"
import {ClockCircleOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";

const ButtonAI = () => {
  return (
    <>
    <button className='btnAi'>
        <ClockCircleOutlined />
        <Link to="/chatAI" style={{marginLeft:10, color:"#ffff"}}>Tư vấn AI</Link>
        </button>
    </>
  )
}

export default ButtonAI
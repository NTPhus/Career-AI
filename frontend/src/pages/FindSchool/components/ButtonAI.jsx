import "./ButtonAI.css"
import {ClockCircleOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";

const ButtonAI = (prop) => {
  const key = prop.prop.key;
  const majorName = prop.prop.majorName;
  const url = "/chatAI?key=" + key + "&majorName=" + majorName;
  return (
    <>
    <button className='btnAi'>
        <ClockCircleOutlined />
        <Link to={url} style={{marginLeft:10, color:"#ffff"}}>Tư vấn AI</Link>
        </button>
    </>
  )
}

export default ButtonAI
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button style={{background:"#ffb703"}} onClick={handleClick}>
      Quay lại
    </button>
  );
};

export default Back;

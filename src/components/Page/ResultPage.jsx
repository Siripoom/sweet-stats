import { useLocation } from "react-router-dom";

function ResultPage() {
  const { state } = useLocation();
  const { sugarLimit } = state;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">
        ปริมาณน้ำตาลที่แนะนำ
      </h1>
      <div className="text-center text-xl">
        <p>
          คุณไม่ควรบริโภคน้ำตาลเกิน {sugarLimit} gกรัมต่อวันตามน้ำหนักตัวของคุณ
        </p>
      </div>
    </div>
  );
}

export default ResultPage;

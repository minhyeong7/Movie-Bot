import { useState } from "react";

function App() {
  const [text, setText] = useState("");

  const send = async () => {
    await fetch("http://localhost:8080/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: text }),
    });
    alert("전송 완료");
  };

  return (
    <div >
      <input className="border"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="border" onClick={send}>저장</button>
    </div>
  );
}

export default App;


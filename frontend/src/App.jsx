import { useState } from "react";
import { apiFetch } from "./api/test";

function App() {
  const [text, setText] = useState("");

  const send = async () => {
    await apiFetch("/api/test", {
      method: "POST",
      body: JSON.stringify({ content: text }),
    });
    alert("전송 완료");
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={send}>저장</button>
    </div>
  );
}

export default App;

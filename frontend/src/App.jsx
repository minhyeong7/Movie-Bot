import { useEffect, useState } from "react";
import { getMembers, createMember } from "./api/member";

function App() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  // 전체 조회
  const loadMembers = async () => {
    const data = await getMembers();
    setMembers(data);
  };

  // 저장
  const save = async () => {
    await createMember({
      name: form.name,
      email: form.email,
      age: Number(form.age),
    });

    setForm({ name: "", email: "", age: "" });
    loadMembers();
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>회원 등록</h2>

      <input
        placeholder="이름"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br />

      <input
        placeholder="이메일"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br />

      <input
        placeholder="나이"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      <br />

      <button onClick={save}>저장</button>

      <hr />

      <h2>회원 목록</h2>
      <ul>
        {members.map((m) => (
          <li key={m.id}>
            {m.name} / {m.email} / {m.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

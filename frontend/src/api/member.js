import { BASE_URL } from "./header";

// 전체 회원 조회
export const getMembers = async () => {
  const res = await fetch(`${BASE_URL}/api/members`);
  return res.json();
};

// 회원 저장
export const createMember = async (member) => {
  const res = await fetch(`${BASE_URL}/api/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });

  if (!res.ok) {
    throw new Error("회원 저장 실패");
  }

  return res.json();
};

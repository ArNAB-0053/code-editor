export const getResult = async (code: string) => {
  const res = await fetch("http://localhost:5000/api/PythonRunner", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  const op = await res.json();
  return op.output ?? ""
};

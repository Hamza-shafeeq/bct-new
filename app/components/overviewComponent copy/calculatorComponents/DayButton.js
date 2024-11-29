// DayButton.js

export default function DayButton({ text, index, dayActive, onClick }) {
  const isActive = dayActive === index;
  const buttonColor = isActive ? "#E41E34" : "#2E3037";
  // console.log("isActive", isActive);
  return (
    <button
      className="px-3 py-2 rounded-2xl text-[13px] text-[#FFFFFF]"
      style={{ backgroundColor: buttonColor }}
      onClick={() => onClick(index)}
    >
      {text}
    </button>
  );
}

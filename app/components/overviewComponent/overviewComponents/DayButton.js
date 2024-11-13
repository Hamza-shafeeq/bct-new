// DayButton.js

export default function DayButton({ text, index, dayActive, onClick }) {
    const isActive = dayActive === index;
    const buttonColor = isActive ? "#E41E34" : "#2E3037";
  
    return (
      <button
        className="px-6 py-2 rounded-2xl text-[13px]"
        style={{ backgroundColor: index == 1 ? buttonColor : null }}
        onClick={() => onClick(index)}
      >
        {text}
      </button>
    );
  }
  
function Panel({
  panel,
  onSelect,
  yoko = 5,
  size = 50,
  style = {},
  selectedStyle = (i) => {
    return { background: "transparent" };
  },
}) {
  return (
    <>
      {panel.map((v, i) => {
        const no = Number.isInteger(v.no) ? v.no : i;
        const moji = v.moji || "";
        return (
          <button
            key={no}
            style={{
              width: size + "px",
              height: size + "px",
              position: "absolute",
              top: Math.floor(no / yoko) * size,
              left: (no % yoko) * size,
              ...selectedStyle(no),
              ...style,
            }}
            onClick={() => onSelect(no)}
          >
            {moji}
          </button>
        );
      })}
    </>
  );
}

export default Panel;

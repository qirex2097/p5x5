import Panel from "./panel";

const command_data = [
  {
    // 0
    no: 0,
    moji: "1",
    func: set_value,
    selected_style: { background: "pink", border: "solid 5px black" },
  },
  {
    no: 1,
    moji: "2",
    func: set_value,
    selected_style: { background: "pink", border: "solid 5px black" },
  },
  {
    no: 2,
    moji: "3",
    func: set_value,
    selected_style: { background: "pink", border: "solid 5px black" },
  },
  {
    no: 3,
    moji: "4",
    func: set_value,
    selected_style: { background: "pink", border: "solid 5px black" },
  },
  {
    no: 4,
    moji: "5",
    func: set_value,
    selected_style: { background: "pink", border: "solid 5px black" },
  },
  {
    no: 5,
    moji: "",
    func: set_color,
    selected_style: { background: "springgreen", border: "solid 5px black" },
    base_style: { background: "springgreen", border: "solid 1px grey" },
  },
  {
    no: 6,
    moji: "",
    func: set_color,
    selected_style: { background: "deepskyblue", border: "solid 5px black" },
    base_style: { background: "deepskyblue", border: "solid 1px grey" },
  },
  {
    no: 7,
    moji: "",
    func: set_color,
    selected_style: { background: "gold", border: "solid 5px black" },
    base_style: { background: "gold", border: "solid 1px grey" },
  },
  {
    no: 8,
    moji: "",
    func: set_color,
    selected_style: { background: "hotpink", border: "solid 5px black" },
    base_style: { background: "hotpink", border: "solid 1px grey" },
  },
  {
    no: 9,
    moji: "",
    func: delete_color,
    selected_style: { background: "moccasin", border: "solid 5px black" },
    base_style: { background: "moccasin", border: "solid 1px grey" },
  },
  {
    no: 10,
    moji: "CLS",
    base_style: {
      background: "dimgrey",
      color: "white",
      border: "solid 1px grey",
    },
  },
  {
    no: 11,
    moji: "UNDO",
    base_style: {
      background: "midnightblue",
      color: "white",
      border: "solid 1px grey",
    },
  },
  {
    no: 12,
    moji: "REDO",
    base_style: {
      background: "darkslategrey",
      color: "white",
      border: "solid 1px grey",
    },
  },
  {
    no: 13,
    moji: "HINT",
    base_style: {
      background: "black",
      color: "white",
      border: "solid 1px grey",
    },
  },
  {
    no: 14,
    moji: "DEL",
    func: delete_value,
    selected_style: { background: "moccasin", border: "solid 5px black" },
    base_style: { background: "moccasin", border: "solid 1px grey" },
  },
];

function set_value(block, command) {
  const new_block = JSON.parse(JSON.stringify(block));
  new_block.value = command.no + 1;

  return new_block;
}

function delete_value(block, command) {
  const { value, color, ...new_block } = JSON.parse(JSON.stringify(block));

  return new_block;
}

function set_color(block, command) {
  const new_block = JSON.parse(JSON.stringify(block));
  new_block.color = command.base_style["background"];

  return new_block;
}

function delete_color(block, command) {
  const { color, ...new_block } = JSON.parse(JSON.stringify(block));

  return new_block;
}

//----------------------------------------

function Command({ command, onSelect }) {
  const selectedStyle = (i_command) => {
    if (!i_command) return {};

    const base_style = i_command.base_style || {
      background: "transparent",
      border: "solid 1px black",
    };

    if (!command) {
      return base_style;
    }
    const selected_style = command.selected_style || base_style;

    return command.no === i_command.no ? selected_style : base_style;
  };

  const selected_command = no => command_data.find(e => e.no === no);

  return (
    <div style={{ position: "relative", height: 160 }}>
      <Panel
        panel={command_data}
        onSelect={(no) => onSelect(selected_command(no))}
        selectedStyle={(no) => selectedStyle(selected_command(no))}
      />
    </div>
  );
}

export default Command;

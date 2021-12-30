const command_data = [
    {   // 0
        no: 0,
        moji: '1',
        func: set_value,
        style: { background: 'pink', border: 'solid 5px black'},
    },
    { 
        no: 1,
        moji: '2',
        func: set_value,
        style: { background: 'pink', border: 'solid 5px black'},
    },
    { 
        no: 2,
        moji: '3',
        func: set_value,
        style: { background: 'pink', border: 'solid 5px black'},
    },
    { 
        no: 3,
        moji: '4',
        func: set_value,
        style: { background: 'pink', border: 'solid 5px black'},
    },
    { 
        no: 4,
        moji: '5',
        func: set_value,
        style: { background: 'pink', border: 'solid 5px black'},
    },
  {
    no: 5,
    moji: '',
    func: set_color,
    style: {background: 'seagreen', border: 'solid 5px black', },
    base_style: {background: 'seagreen', border: 'solid 1px grey', },
  },
  {
    no: 6,
    moji: '',
    func: set_color,
    style: { background: 'royalblue', border: 'solid 5px black', },
    base_style: {background: 'royalblue', border: 'solid 1px grey', },
  },
  {
    no: 7,
    moji: '',
    func: set_color,
    style: { background: 'gold', border: 'solid 5px black', },
    base_style: {background: 'gold', border: 'solid 1px grey', },
  },
  {
    no: 8,
    moji: '',
    func: set_color,
    style: { background: 'hotpink', border: 'solid 5px black', },
    base_style: {background: 'hotpink', border: 'solid 1px grey', },
  },
  {
    no: 9,
    moji: '',
    func: delete_color,
    style: { background: 'moccasin', border: 'solid 5px black', },
    base_style: {background: 'moccasin', border: 'solid 1px grey', },
  },
  {
    no: 10,
    moji: 'DEL',
    func: delete_value,
    style: { background: 'moccasin', border: 'solid 5px black'},
    base_style: { background: 'moccasin', border: 'solid 1px grey'},
  },
];

function set_value(block, command) {
  const new_block = JSON.parse(JSON.stringify(block));
  new_block.value = command.no + 1;

  return new_block;
}

function delete_value(block, command) {
  const {
    value,
    color,
    ...new_block 
  } = JSON.parse(JSON.stringify(block));

  return new_block;
}

function set_color(block, command) {
  const new_block = JSON.parse(JSON.stringify(block));
  new_block.color =command.base_style['background'];

  return new_block;
}

function delete_color(block, command) {
  const {
    color,
    ...new_block 
  } = JSON.parse(JSON.stringify(block));

  return new_block;
}

export default command_data;

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
    {   // 5
        no: 9,
        moji: 'DEL',
        func: delete_value,
        style: { background: 'orange', border: 'solid 5px black'},
        base_style: { background: 'lightgrey', border: 'solid 1px grey'},
    },
];

function initialize_blocks(tate, yoko) {
    return Array(tate * yoko).fill(0);
}

function getBlock(blocks, block_no) {
    return blocks[block_no];
}

function new_blocks(blocks, block_no, value) {
    const new_blocks = Array(...blocks);
    new_blocks[block_no] = value;
    
    return new_blocks;
}

function set_value(blocks, block_no, command) {
    return new_blocks(blocks, block_no, command + 1);
}
function delete_value(blocks, block_no, command) {
    return new_blocks(blocks, block_no, 0);
}

export default initialize_blocks;
export { command_data, getBlock }
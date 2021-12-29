const command_moji = ['1', '2', '3', '4', '5', 'DEL'];
const command_list = [
    set_value,
    set_value,
    set_value,
    set_value,
    set_value,
    delete_value,
];

function initialize_blocks() {
    return Array(25).fill(0);
}

function getBlock(blocks, block_no) {
    return blocks[block_no];
}

function new_blocks(blocks, block_no, value) {
    const new_blocks = Array(...blocks);
    new_blocks[block_no] = value;
    
    console.log(new_blocks);

    return new_blocks;
}

function set_value(blocks, block_no, command) {
    return new_blocks(blocks, block_no, command + 1);
}
function delete_value(blocks, block_no, command) {
    return new_blocks(blocks, block_no, 0);
}

const dummy = 0;

export default initialize_blocks;
export { command_moji, command_list, getBlock }
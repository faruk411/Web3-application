//SPDX-License-Identifier: MIT

pragma solidity 0.4.26;

contract Piyango{

    address public manager;
    address[] public players;

    function Piyango() public
    {
        manager = msg.sender;
    }
    function enter() public payable {
        require(msg.value > .01 ether);
    
        players.push(msg.sender);
    }
    function random() private   view returns(uint){
       return uint(keccak256(abi.encode(block.difficulty, block.timestamp , players)));
       
    }
    function pickWinner() public restricted {

        uint index = random() % players.length;
        players[index].transfer(this.balance);
        // (bool success, ) = players[index].call{value: address(this).balance}("");
        // require(success, "Transfer failed.");
        players = new address[](0);
        
    }
    modifier restricted(){
        require(msg.sender == manager,"Address information is not the same as manager");
        _;
    }
    function getPlayers() public view returns (address[] memory){
        return players;
    }

     
}
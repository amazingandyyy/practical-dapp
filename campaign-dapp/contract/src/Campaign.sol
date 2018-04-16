pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    function createCampaign(uint _minimum) public {
        address newCampaign = new Campaign(msg.sender, _minimum);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    address public manager;
    uint public minimumContributionInWei;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvers;
    }
    
    Request[] public requests;
    
    modifier isManager() {
        require(msg.sender == manager);
        _;
    }
    
    modifier isApprover() {
        require(approvers[msg.sender]);
        _;
    }
    
    function Campaign(address _manager, uint _minimum) public {
        manager = _manager;
        minimumContributionInWei = _minimum;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContributionInWei);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string _description, uint _value, address _recipient ) public isManager {
        require(_value < address(this).balance);
        
        Request memory newRequest = Request({
            description: _description,
            value: _value,
            recipient: _recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint _index) public isApprover {
        Request storage request = requests[_index];
        
        require(!request.complete);
        require(!request.approvers[msg.sender]); // sender has not voted
        
        request.approvers[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint _index) public isManager {
        Request storage request = requests[_index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        
        address(request.recipient).transfer(request.value);
        request.complete = true;
    }
    
}
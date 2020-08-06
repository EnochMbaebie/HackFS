// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.8.0;

/// @title SupplyChain
/// @author HackFS Supply Chain
/// @notice Implements Decentralized Supply Chain


import "./Ownable.sol";

contract SChainDapp is Ownable {

    /// @dev store the product count/id (public for getter())
    uint public productIdCounter = 0;

    address public scAdmin;
    mapping(address => bool) public isSCadmins;
    mapping(address => string) public isProductOwners;

    mapping (address => string) public attestations;

    /// @notice A Producg:
    /// @param Product Id: @productId
    /// @param Product Value: @productValue
    /// @param Product Name: @productName
    /// @param Product GPA: @productGpgga
    /// @param Product Destination: @productDest
    /// @param Product Producer: @productProducer
    /// @param Product Customer: @productCustomer
    /// @param Product Seller: @productSeller
    /// @param Product Distributor: @productDistributor
    struct Product {
        uint productId;
        string productName;
        string productInfo;
        uint256 productValue;
        string productGpgga;
        string productDest;
        address payable productProducer;
        address productCustomer;
        address productSeller;
        address productDistributor;
    }
 
    mapping (uint => Product) public products;

    /// @notice LogMsgData should provide the MsgData
    event LogMsgData(
        bytes data
    );

    /// @notice LogAddProduct should provide info about the product
    /// @param prodId the product id
    /// @param prodName the product name
    /// @param prodInfo the produt infi
    /// @param prodValue the product value
    /// @param prodGpgga the product coordinates
    /// @param prodDest the product destination
    event LogAddProduct(
        uint prodId,
        string prodName,
        string prodInfo,
        uint256 prodValue,
        string prodGpgga,
        string prodDest
    );

    /// @notice Create a modifier that throws an error if the address !isAdmin
    /// @param _isAdmin the new admin
    modifier onlyAdmin(address _isAdmin) {
        require(
            isSCadmins[_isAdmin],
            "Must be an admin to call this function."
        );
        _;
    }

    /// @notice Calling the Ownable constructor to insure that the address deploying this contract is 
    /// regsitered as owner and to set owner as an admin
    constructor() 
        public
        Ownable()
    {
        scAdmin = owner();      
        addAdmin(scAdmin);
        addProduct("pname", "pinfo", 1, "0", "unknown");
    }

    /// @notice Payable fallback
    receive() external payable {
        emit LogMsgData(_msgData());
    }

    /// @notice kill the smart contract
    function kill() public onlyOwner {
        selfdestruct(_msgSender());
    }
    
    /// @notice This function adds an MPadmin
    /// @param _newAdmin the new admin
    function addAdmin(address _newAdmin)
        internal
        virtual
        onlyOwner
    {  
        isSCadmins[_newAdmin] = true;
    }

    /// @notice This function adds a Product
    /// @dev The productId is derived from the counter
    /// @param prodName The product name
    /// @param prodInfo Any product info
    /// @param prodValue The product value
    /// @param prodGpgga The product gpa
    /// @param prodDest the product dest
    function addProduct(
        string memory prodName, 
        string memory prodInfo,
        uint256 prodValue,
        string memory prodGpgga,
        string memory prodDest
    )
        public
        onlyAdmin(_msgSender())
 
    {
        productIdCounter++;

        /// @notice update via productId
        products[productIdCounter] = Product(
            productIdCounter,
            prodName,
            prodInfo,
            prodValue = 0,
            prodGpgga = "",
            prodDest = "",
            _msgSender(),
            address(0),
            address(0),
            address(0)
        );

        emit LogAddProduct(productIdCounter, prodName, prodInfo, prodValue, prodGpgga, prodDest); 
    }

    /// @notice Returns Product
    /// @return product's Id
    /// @return product's name
    /// @return product's info
    /// @return product's value
    /// @return product's producer
    function getProductById(uint _prodId)
        public
        view
        returns (
            uint,
            string memory,
            string memory,
            uint256,
            address 
        )
    {
          require(
              _prodId > 0 && _prodId <= productIdCounter,
              "The product Id is not vaild"
          );

          return (
              products[_prodId].productId,
              products[_prodId].productName,
              products[_prodId].productInfo,
              products[_prodId].productValue,
              products[_prodId].productProducer
        );
    }

    function attest(string memory hash) public {
       // console.log(msg.sender,"attests to",hash);
       emit Attest(msg.sender,hash);
       attestations[msg.sender] = hash;
    }
  
    event Attest(address sender, string hash);

}
